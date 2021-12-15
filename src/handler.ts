import { Relayer } from 'defender-relay-client'
import { receiverDrawLockAndNetworkTotalSupplyPush } from 'v4-autotask-lib'
import contracts from './contracts.json'

export async function handler(event: any) {
  const relayer = new Relayer(event);
  const config = {
    beaconChain: {
      chainId: 4,
      providerUrl: `https://rinkeby.infura.io/v3/b81e24d29d1942b8bf04bf3c81ae3761`,
    },
    targetReceiverChain: {
      chainId: 43113,
      providerUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
    },
    allPrizePoolNetworkChains: [
      {
        chainId: 4,
        providerUrl: `https://rinkeby.infura.io/v3/b81e24d29d1942b8bf04bf3c81ae3761`,
      },
      {
        chainId: 80001,
        providerUrl: `https://polygon-mumbai.infura.io/v3/b81e24d29d1942b8bf04bf3c81ae3761`,
      },
      {
        chainId: 43113,
        providerUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
      }
    ]
  }

  try {
    const transactionPopulated = await receiverDrawLockAndNetworkTotalSupplyPush(contracts, config)
    if (transactionPopulated) {
      let transactionSentToNetwork = await relayer.sendTransaction({
        data: transactionPopulated.data,
        to: transactionPopulated.to,
        gasLimit: 500000,
        speed: 'fast'
      });
      console.log('TransactionHash:', transactionSentToNetwork.hash)
    } else {
      throw new Error('DrawBeacon: Transaction not populated')
    }
  } catch (error) {
    console.log(error)
  }
}
