import { Relayer } from 'defender-relay-client'
import { receiverDrawLockAndNetworkTotalSupplyPush } from '@pooltogether/v4-autotask-lib'
import { testnet as testnestContracts } from '@pooltogether/v4-pool-data'

export async function handler(event: any) {
  const relayer = new Relayer(event);

  const {
    ethereumRinkebyProviderURL,
    polygonMumbaiProviderURL,
    avalancheFujiProviderURL,
    optimismKovanProviderURL
  } = event.secrets;

  const config = {
    beaconChain: {
      chainId: 4,
      providerUrl: ethereumRinkebyProviderURL,
    },
    receiverChain: {
      chainId: 43113,
      providerUrl: avalancheFujiProviderURL,
    },
    allPrizePoolNetworkChains: [
      {
        chainId: 4,
        providerUrl: ethereumRinkebyProviderURL,
      },
      {
        chainId: 80001,
        providerUrl: polygonMumbaiProviderURL,
      },
      {
        chainId: 43113,
        providerUrl: avalancheFujiProviderURL,
      },
      {
        chainId: 69,
        providerUrl: optimismKovanProviderURL,
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
