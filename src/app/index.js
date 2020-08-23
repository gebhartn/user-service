import express from 'express'
import { buildMakeApp } from './app'

const app = express()

export const makeApp = buildMakeApp({ app })
