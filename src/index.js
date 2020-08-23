import { makeApp } from './app'
import { middleware } from './middleware'
import { routes } from './routes'

const port = process.env.PORT || 8080
const app = makeApp({ middleware, routes })

app.listen(port, () => console.log('Listening on port: ' + port))
