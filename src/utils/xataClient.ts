import { XataClient } from '@/utils/xata'

const xataClient = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
  branch: import.meta.env.XATA_BRANCH,
})
const xata = xataClient.db

export default xata
