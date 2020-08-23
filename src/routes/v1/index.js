import { Router } from 'express'
import { users } from './users-router'

export const v1 = Router()

v1.use('/users', users)
