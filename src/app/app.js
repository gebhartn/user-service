export function buildMakeApp({ app }) {
  return function makeApp({ middleware, routes }) {
    middleware({ app })
    app.use('/', routes)

    return app
  }
}
