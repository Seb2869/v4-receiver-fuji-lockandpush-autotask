import { Relayer } from 'defender-relay-client'
import { L2DrawAndPrizeDistributionPush } from 'v4-autotask-lib'
import contracts from '@pooltogether/v4-testnet/testnet.json'
const debug = require('debug')('pt-autotask')

export async function handler(event: any) {
  const { infuraApiKey } = event.secrets;
  const relayer = new Relayer(event);
  const config = {
    speed: "fast",
    gasLimit: 50000,
    execute: false,
    L1: {
      chainId: 4,
      providerUrl: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
    },
    L2: {
      chainId: 43113,
      providerUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    },
  }

  const { msg: L2Msg, err: L2Error, status: L2Status, transaction: L2Transaction } = await L2DrawAndPrizeDistributionPush(contracts, config, relayer)
  if (L2Error && L2Status == -1) console.log(L2Error);
  debug("L2Msg:", L2Msg)
  debug("L2Error:", L2Error)
  debug("L2Status:", L2Status)
  if (L2Error && L2Status == -1) console.log(L2Error);
  if (L2Status == 1) {
    console.log('Executing:', L2Msg)
    let L2tx = await relayer.sendTransaction({
      data: L2Transaction.data,
      to: L2Transaction.to,
      gasLimit: 500000,
      speed: 'fast'
    });
    console.log('Hash:', L2tx.hash)
    console.log('Completed:', L2Msg)
  }
}
