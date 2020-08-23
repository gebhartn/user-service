import { Router } from 'express'
import { apiController } from '../../controllers'
import { makeCallback } from '../../express-callback'

export const health = Router()

health.get('/', makeCallback(apiController.health))
