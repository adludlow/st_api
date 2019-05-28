import { GeneralError } from '@feathersjs/errors'

const endpoint = 'players'
const table = 'player'
const tableColumns = [ 'native_id', 'first_name', 'last_name', 'attributes' ]

export const players = () => (app) => {
  const knex = app.get('knex_st')

  app.use(endpoint, {

    async create (data) {
      try {
        const { id, first_name, last_name } = data

        return await knex(table).insert({ id, first_name, last_name, attributes: data }, tableColumns)
      } catch (error) {
        throw new GeneralError(error)
      }
    }

  })
}
