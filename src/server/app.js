import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import config from 'config'
import knex from 'knex'

export const app = express(feathers())
