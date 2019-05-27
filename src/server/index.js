import { port } from 'config'
import { app } from './app'
import { logger } from './logger'

app
  .on('listening', () => {
    logger.info(`Application started on port ${port}`)
  })
  .listen(port)
