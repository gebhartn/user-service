import crypto from 'crypto'
import { buildMakeUser } from './user'

const md5 = text => crypto.createHash('md5').update(text, 'utf-8').digest('hex')

// todo: proper input validation
const validate = text => text.trim().length > 5

export const makeUser = buildMakeUser({ md5, validate })
