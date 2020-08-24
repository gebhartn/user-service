import { common } from './common'
import { errors } from './errors'

function makeMiddleware({ middlewares }) {
  return function middleware({ app }) {
    for (const middleware of middlewares) {
      middleware(app)
    }
  }
}

export const middleware = makeMiddleware({
  middlewares: [...common, ...errors],
})

export { inspectToken } from './inspect-token'
