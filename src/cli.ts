import { handler } from './handler'

if (require.main === module) {
  const {
    RELAYER_API_KEY: apiKey,
    RELAYER_API_SECRET: apiSecret,
    ETHEREUM_RINKEBY_PROVIDER_URL: ethereumRinkebyProviderURL,
    POLYGON_MUMBAI_PROVIDER_URL: polygonMumbaiProviderURL,
    AVALANCHE_FUJI_PROVIDER_URL: avalancheFujiProviderURL,
    OPTIMISM_KOVAN_PROVIDER_URL: optimismKovanProviderURL
  } = process.env;

  handler({
    apiKey,
    apiSecret,
    secrets: {
      ethereumRinkebyProviderURL,
      polygonMumbaiProviderURL,
      avalancheFujiProviderURL,
      optimismKovanProviderURL
    }
  })
    .then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}

export function main() {

}
