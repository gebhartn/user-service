import { makeAddUser } from './add-user'
import { usersDb } from '../data-access'

export const addUser = makeAddUser({ usersDb })
;(async () => {
  const user = {
    email: 'nick@gmail.com',
    firstName: null,
    lastName: null,
    password: 'lordworm',
  }
  const result = await addUser(user)
})()

export const userService = Object.freeze({
  addUser,
})
