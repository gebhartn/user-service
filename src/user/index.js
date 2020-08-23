import crypto from 'crypto'
import { buildMakeUser } from './user'

const md5 = text => crypto.createHash('md5').update(text, 'utf-8').digest('hex')

export const makeUser = buildMakeUser({ md5 })
