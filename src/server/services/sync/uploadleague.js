import { GeneralError } from '@feathersjs/errors'
import multer from 'multer'
import csvParse from 'csv-parse/lib/sync'

const endpoint = 'sync/uploadleague'

export const uploadleague = () => (app) => {
  const knex = app.get('knex_st')
  const playersSvc = app.service('players')

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fieldSize: 10
    }
  })
  
  app.use(
    endpoint,
    upload.single('file'),
    (req, res, next) => {
      req.feathers.file = req.file
      next()
    },
    {
      async create (data, params) {

        const league = params.file.buffer.toString('utf-8')
        const records = csvParse(league, {
          columns: true,
          skip_empty_lines: true
        })

        const teams = records.reduce((acc, curr) => {
          if (curr.team && !acc.includes(curr.team))
            acc.push(curr.team)
          return acc
        }, [])
        try {
          let scTeams = []
          await knex.transaction(async txn => {
            for (const t of teams) {
              const scTeam = await txn('sc_team')
                .insert({ name: t })
                .returning([ 'id', 'name' ])
              scTeams.push(scTeam[0])
            }
            for (const r of records) {
              const query = {
                first_name: r.first_name,
                last_name: r.last_name
              }
              const [ player ] = await playersSvc.find({ query })
              console.log(player)
              if (!player)
                console.log(r.first_name, r.last_name)
              else if (r.team) {
                const scTeam = scTeams.find(t => t.name === r.team)
                const mapResult = await txn('sc_team_player_map')
                  .insert({ player_id: player.id, sc_team_id: scTeam.id})
                  .returning([ 'id' ])
              }
            }
          })
          return { status: 'ok' }
        } catch (error) {
          throw new GeneralError(error)
        }
      }
    })
}
