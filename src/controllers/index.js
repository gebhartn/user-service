import bcrypt from 'bcryptjs'

import { addUser } from '../use-cases'
import { makePostUser } from './post-user'

const hash = password => bcrypt.hashSync(password, 8)

export const postUser = makePostUser({ addUser, hash })
export const userController = Object.freeze({ postUser })
