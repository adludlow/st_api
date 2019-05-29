import bodyParser from 'body-parser'
import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import config from 'config'
import knex from 'knex'
import { syncplayers } from './services/sync/players'
import { uploadleague } from './services/sync/uploadleague'
import { players } from './services/players'

export const app = express(feathers())

app
  .set('knex_st', knex(config.knex_st))
  .use(bodyParser.json())
  .configure(express.rest())
  .configure(players())
  .configure(syncplayers())
  .configure(uploadleague())
