import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { inputError } from './input-error'

export function middleware({ app }) {
  app.use(cors())
  app.use(helmet())
  app.use(express.json())
  app.use(inputError)
}
