import { urlencoded, json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

const handleCors = app => {
  app.use(cors({ credentials: true, origin: true }))
}

const handleHelmet = app => {
  app.use(helmet())
}

const handleParser = app => {
  app.use(urlencoded({ extended: true }))
  app.use(json())
}

const handleCompression = app => {
  app.use(compression())
}

export const common = [
  handleCors,
  handleHelmet,
  handleParser,
  handleCompression,
]
