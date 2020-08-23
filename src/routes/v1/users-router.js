import { Router } from 'express'
import { userController } from '../../controllers'
import { makeCallback } from '../../express-callback'

export const users = Router()

users.post('/', makeCallback(userController.postUser))
users.get('/', makeCallback(userController.getUsers))
users.use(makeCallback(userController.notFound))
