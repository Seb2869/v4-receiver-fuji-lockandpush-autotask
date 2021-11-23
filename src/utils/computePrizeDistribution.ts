import { computeCardinality } from './computeCardinality'
import { calculatePicks } from './calculatePicks'
const debug = require('debug')('pt:computePrizeDistribution')

interface Draw {
    drawId: number;
    beaconPeriodSeconds: number;
}
interface ContractPrizeTierHistory {
    getPrizeTier: Function
}
interface ReserverContract {
    getReserveAccumulatedBetween: Function
}

export async function computePrizeDistribution(
    draw: Draw,
    prizeTierHistory: ContractPrizeTierHistory,
    reserveToCalculate: ReserverContract,
    otherReserve: ReserverContract,
    totalSupplyTickets: number,
    totalSupplyDecimals: number
) {
    debug('entered')

    const prizeTier = await prizeTierHistory.getPrizeTier(draw.drawId)

    const beaconPeriod = draw.beaconPeriodSeconds
    const startTimestampOffset = beaconPeriod
    const endTimestampOffset = 300 // say five minutes of offset.  enough for clock drift?

    debug('computing cardinality...')

    const matchCardinality = computeCardinality(prizeTier.bitRangeSize, totalSupplyTickets, totalSupplyDecimals)

    debug(`cardinality is ${matchCardinality}`)

    debug('computing number of picks...')

    const numberOfPicks = await calculatePicks(prizeTier.bitRangeSize, matchCardinality, beaconPeriod - startTimestampOffset, beaconPeriod - endTimestampOffset, reserveToCalculate, otherReserve)

    debug(`number of picks is ${numberOfPicks}`)

    const prizeDistribution = {
        bitRangeSize: prizeTier.bitRangeSize,
        matchCardinality,
        tiers: prizeTier.tiers,
        maxPicksPerUser: prizeTier.maxPicksPerUser,
        numberOfPicks,
        startTimestampOffset,
        prize: prizeTier.prize,
        endTimestampOffset
    }

    // debug('prize distribution: ', prizeDistribution)

    return prizeDistribution
}

export default computePrizeDistribution