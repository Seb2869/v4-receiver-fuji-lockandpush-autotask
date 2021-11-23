// @ts-nocheck
import { handler } from './handler'

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  const {
    L1_RELAYER_API_KEY: L1RelayerAbiKey,
    L1_RELAYER_SECRET: L1RelayerSecret,
    L2_RELAYER_API_KEY: L2RelayerApiKey,
    L2_RELAYER_SECRET: L2RelayerSecret,
    INFURA_API_KEY: infuraApiKey
  } = process.env;
  handler({
    apiKey: L1RelayerAbiKey,
    apiSecret: L1RelayerSecret,
    secrets: {
      L2RelayerApiKey, L2RelayerSecret, infuraApiKey
    }
  })
    .then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}

export function main() {

}