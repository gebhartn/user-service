import https from 'https'

import { makeApp } from './app'
import { middleware } from './middleware'
import { routes } from './routes'

process.on('uncaughtException', e => {
  console.error(e)
  process.exit(1)
})

process.on('unhandledRejection', e => {
  console.error(e)
  process.exit(1)
})

const port = process.env.PORT || 8080
const app = makeApp({ middleware, routes })
const server = https.createServer(app)

server.listen(port, () =>
  console.log(
    'Server listening on port: ' +
      port +
      '\n' +
      'Database connected at port: ' +
      process.env.DB_PORT
  )
)
