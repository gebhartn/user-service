import { makeAddUser } from './add-user'
import { makeListUsers } from './list-users'
import { usersDb } from '../data-access'

export const addUser = makeAddUser({ usersDb })
export const listUsers = makeListUsers({ usersDb })

export const userService = Object.freeze({
  addUser,
  listUsers,
})
