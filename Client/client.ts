
import {deserializeIlpReply, IlpPrepare, serializeIlpPrepare} from 'ilp-packet'
import Axios from 'axios'
import { createHash } from 'crypto'

export const STATIC_FULFILLMENT = Buffer.alloc(32)
export const STATIC_CONDITION = createHash('SHA256').update(STATIC_FULFILLMENT).digest()
 
async function run () {
    const ilpPrepare: IlpPrepare = {
        amount: '1',
        data: Buffer.from(''),
        destination: '197.245.174.76.Bob',
        executionCondition: STATIC_CONDITION,
        expiresAt: new Date(Date.now() + 34000)
      }
  
      const { data } = await Axios.post('http://localhost:8443/ilp', serializeIlpPrepare(ilpPrepare), { headers: { 'Authorization': 'Bearer QFVU2An4To65t1JgJgPd9dsfP8IjmHMIpuHN' }, responseType: 'arraybuffer' })
      const result = deserializeIlpReply(data)
      console.log(result) 
}

run()