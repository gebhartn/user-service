import bcrypt from 'bcryptjs'

import { addUser, listUsers } from '../use-cases'
import { makePostUser } from './post-user'
import { makeGetUsers } from './get-users'
import { health } from './api-health'
import { notFound as not } from './not-found'

const hash = password => bcrypt.hashSync(password, 8)
const validate = str => str.trim().length > 5

export const postUser = makePostUser({ addUser, hash, validate })
export const getUsers = makeGetUsers({ listUsers })
export const notFound = not

export const userController = Object.freeze({ postUser, getUsers, notFound })
export const apiController = Object.freeze({ health })
