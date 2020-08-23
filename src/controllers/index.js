import bcrypt from 'bcryptjs'

import { addUser, listUsers } from '../use-cases'
import { makePostUser } from './post-user'
import { makeGetUsers } from './get-users'
import { health } from './api-health'

const hash = password => bcrypt.hashSync(password, 8)
const validate = str => str.trim().length > 5

export const postUser = makePostUser({ addUser, hash, validate })
export const getUsers = makeGetUsers({ listUsers })

export const userController = Object.freeze({ postUser, getUsers })
export const apiController = Object.freeze({ health })
