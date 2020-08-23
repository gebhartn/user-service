import { makeAddUser } from './add-user'
import { usersDb } from '../data-access'

export const addUser = makeAddUser({ usersDb })

export const userService = Object.freeze({
  addUser,
})
