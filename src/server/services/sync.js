import { GeneralError } from '@feathersjs/errors'
import rp from 'request-promise'
import config from 'config'

const endpoint = 'sync'

export const sync = () => (app) => {
  app.use(endpoint, {
    
    async create (data) {
      try {
        // Create sync job entry
        // Sync data
        const playersReq ={
          method: 'GET',
          uri: config.sc_url + "/2019/api/afl/classic/v1/players-cf?embed=notes%2Codds%2Cplayer_stats%2Cpositions",
          json: true
        }
        const players = await rp(playersReq)

        for (const p of player) {
          
        }

        return players

        // Update sync job entry
      } catch (error) {
        console.log(error)
        throw new GeneralError("Player retrieval failed")
      }
    }

  })
}
