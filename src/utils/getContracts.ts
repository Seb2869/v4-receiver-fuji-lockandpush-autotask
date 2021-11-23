// @ts-nocheck
import { ethers } from 'ethers'
const DrawBeaconRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/DrawBeacon.json')
const L1TimelockTriggerRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/L1TimelockTrigger.json')
const DrawBufferRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/DrawBuffer.json')
const PrizeDistributionBufferRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/PrizeDistributionBuffer.json')
const DrawCalculatorTimelockRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/DrawCalculatorTimelock.json')
const TicketRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/Ticket.json')
const TicketMumbai = require('@pooltogether/v4-testnet/deployments/mumbai/Ticket.json')
const PrizeDistributorRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/PrizeDistributor.json')
const ReserveRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/Reserve.json')
const ReserveMumbai = require('@pooltogether/v4-testnet/deployments/mumbai/Reserve.json')
const PrizeTierHistoryRinkeby = require('@pooltogether/v4-testnet/deployments/rinkeby/PrizeTierHistory.json')

export function getContracts(infuraApiKey) {
  const ethereumProvider = new ethers.providers.InfuraProvider('rinkeby', infuraApiKey)
  const polygonProvider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${infuraApiKey}`)
  const drawBeacon = new ethers.Contract(DrawBeaconRinkeby.address, DrawBeaconRinkeby.abi, ethereumProvider)
  const L1TimelockTrigger = new ethers.Contract(L1TimelockTriggerRinkeby.address, L1TimelockTriggerRinkeby.abi, ethereumProvider)
  const drawBuffer = new ethers.Contract(DrawBufferRinkeby.address, DrawBufferRinkeby.abi, ethereumProvider)
  const prizeDistributionBuffer = new ethers.Contract(PrizeDistributionBufferRinkeby.address, PrizeDistributionBufferRinkeby.abi, ethereumProvider)
  const ticketL1 = new ethers.Contract(TicketRinkeby.address, TicketRinkeby.abi, ethereumProvider)
  const ticketL2 = new ethers.Contract(TicketMumbai.address, TicketMumbai.abi, polygonProvider)
  const prizeDistributor = new ethers.Contract(PrizeDistributorRinkeby.address, PrizeDistributorRinkeby.abi, ethereumProvider)
  const reserveL1 = new ethers.Contract(ReserveRinkeby.address, ReserveRinkeby.abi, ethereumProvider)
  const reserveL2 = new ethers.Contract(ReserveMumbai.address, ReserveMumbai.abi, polygonProvider)
  const drawCalculatorTimelock = new ethers.Contract(DrawCalculatorTimelockRinkeby.address, DrawCalculatorTimelockRinkeby.abi, ethereumProvider)
  const l1TimelockTrigger = new ethers.Contract(L1TimelockTriggerRinkeby.address, L1TimelockTriggerRinkeby.abi, ethereumProvider)
  const prizeTierHistory = new ethers.Contract(PrizeTierHistoryRinkeby.address, PrizeTierHistoryRinkeby.abi, ethereumProvider)

  return {
    ethereumProvider,
    drawBeacon,
    L1TimelockTrigger,
    drawBuffer,
    prizeDistributionBuffer,
    ticketL1,
    ticketL2,
    prizeDistributor,
    reserveL1,
    reserveL2,
    drawCalculatorTimelock,
    l1TimelockTrigger,
    prizeTierHistory
  }
}

export default getContracts