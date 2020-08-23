import { Router } from 'express'
import { userController } from '../../controllers'
import { makeCallback } from '../../express-callback'

export const users = Router()

users.post('/', makeCallback(userController.postUser))
