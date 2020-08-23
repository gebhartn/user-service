import { Router } from 'express'
import { users } from './users-router'
import { health } from './health-router'
import { notFound } from '../../controllers'
import { makeCallback } from '../../express-callback'

export const v1 = Router()

v1.use('/users', users)
v1.use('/health', health)
v1.use(makeCallback(notFound))
