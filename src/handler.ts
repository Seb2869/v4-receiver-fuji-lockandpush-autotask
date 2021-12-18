import { Relayer } from 'defender-relay-client'
import { receiverDrawLockAndNetworkTotalSupplyPush } from '@pooltogether/v4-autotask-lib'
import { testnet as testnestContracts } from '@pooltogether/v4-pool-data'

export async function handler(event: any) {
  const relayer = new Relayer(event);
  const config = {
    beaconChain: {
      chainId: 4,
      providerUrl: `https://rinkeby.infura.io/v3/0b68f87acec2479a9d6106ffb0f2c16d`,
    },
    receiverChain: {
      chainId: 43113,
      providerUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
    },
    allPrizePoolNetworkChains: [
      {
        chainId: 4,
        providerUrl: `https://rinkeby.infura.io/v3/0b68f87acec2479a9d6106ffb0f2c16d`,
      },
      {
        chainId: 80001,
        providerUrl: `https://polygon-mumbai.infura.io/v3/0b68f87acec2479a9d6106ffb0f2c16d`,
      },
      {
        chainId: 43113,
        providerUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
      }
    ]
  }

  try {
    const transactionPopulated = await receiverDrawLockAndNetworkTotalSupplyPush(testnestContracts, config)
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
