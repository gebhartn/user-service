import { makeAddUser } from './add-user'
import { makeListUsers } from './list-users'
import { makeEditUser } from './edit-user'
import { usersDb } from '../data-access'

export const addUser = makeAddUser({ usersDb })
export const editUser = makeEditUser({ usersDb })
export const listUsers = makeListUsers({ usersDb })

export const userService = Object.freeze({
  addUser,
  editUser,
  listUsers,
})
