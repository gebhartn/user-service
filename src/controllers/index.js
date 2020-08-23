import bcrypt from 'bcryptjs'

import { addUser } from '../use-cases'
import { makePostUser } from './post-user'
import { health } from './api-health'

const hash = password => bcrypt.hashSync(password, 8)
const validate = str => str.trim().length > 5

export const postUser = makePostUser({ addUser, hash, validate })

export const userController = Object.freeze({ postUser })
export const apiController = Object.freeze({ health })
