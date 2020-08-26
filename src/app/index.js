import http from 'http'
import express from 'express'

import { routes } from '../routes'
import { middleware } from '../middleware'
import { buildMakeApp } from './app'
import { port } from '../../config'

const makeApp = buildMakeApp({ app: express() })
const application = makeApp({ middleware, routes })
const app = http.createServer(application)

app.listen(port, () => console.log('Server listening on port: ' + port))
