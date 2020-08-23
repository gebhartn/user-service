import { Router } from 'express'
import { users } from './users-router'

export const routes = Router()

routes.use('/users', users)
