import { Router } from 'express'
import { userController } from '../../controllers'
import { makeCallback } from '../../express-callback'

export const users = Router()

users.post('/', makeCallback(userController.postUser))
users.patch('/:id', makeCallback(userController.patchUser))
users.get('/', makeCallback(userController.getUsers))
users.delete('/:id', makeCallback(userController.deleteUser))

users.use(makeCallback(userController.notFound))
