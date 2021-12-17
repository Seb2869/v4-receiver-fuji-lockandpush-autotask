import { handler } from './handler'

if (require.main === module) {
  const {
    RELAYER_API_KEY,
    RELAYER_API_SECRET,
    INFURA_API_KEY: infuraApiKey
  } = process.env;
  handler({
    apiKey: RELAYER_API_KEY,
    apiSecret: RELAYER_API_SECRET,
    secrets: {
      infuraApiKey
    }
  })
    .then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}

export function main() {

}