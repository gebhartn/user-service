import { Router } from 'express'
import { v1 } from './v1'
import { notFound } from '../controllers'
import { makeCallback } from '../express-callback'

export const routes = Router()

routes.use('/v1', v1)
routes.use(makeCallback(notFound))
