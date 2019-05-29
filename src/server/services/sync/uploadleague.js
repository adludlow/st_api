import multer from 'multer'
import csvParse from 'csv-parse/lib/sync'

const endpoint = 'sync/uploadleague'

export const uploadleague = () => (app) => {
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

        for (const r of records) {
          const query = {
            first_name: r.first_name,
            last_name: r.last_name
          }
          const player = playersSvc.find({ query })
          console.log(player.natve_id)
        }

        return records
      }
    })
}
