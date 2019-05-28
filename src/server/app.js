import bodyParser from 'body-parser'
import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import config from 'config'
import knex from 'knex'
import { sync } from './services/sync'
import { players } from './services/players'

export const app = express(feathers())

app
  .set('knex_st', knex(config.knex_st))
  .use(bodyParser.json())
  .configure(express.rest())
  .configure(sync())
  .configure(players())
