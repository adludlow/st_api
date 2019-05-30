import { GeneralError } from '@feathersjs/errors'
import { omitUndefined } from './_common'

const endpoint = 'players'
const table = 'player'
const tableColumns = [ 'native_id', 'first_name', 'last_name', 'attributes' ]

export const players = () => (app) => {
  const knex = app.get('knex_st')

  app.use(endpoint, {

    async create (data) {
      const players = Array.isArray(data) ? data : [ data ]
      let result = []
      try {
        await knex.transaction(async txn => {
          for (const p of players) {
            const { id, first_name, last_name } = p

            const player = await txn(table)
              .insert({ native_id: id, first_name, last_name, attributes: p}, tableColumns)
              .returning([ 'id', 'created_on', ...tableColumns ])
            result.push(player)
          }
        })
        return result
      } catch (error) {
        throw new GeneralError(error)
      }
    },

    async find ({ query = {} }) {
      const q = knex(table)
        .select([ 'id', 'created_on', ...tableColumns ])
        .where(omitUndefined(query))

      try {
        return await q
      } catch (error) {
        throw new GeneralError(error)
      }
    }

  })
}
