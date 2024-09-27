import BunResponse from './tools/bun-response'
import language from './languages/index'

export default class BunExpress {
  constructor () {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {},
      PATCH: {}
    }
    this.middlewares = []
  }

  use (middleware) {
    this.middlewares.push(middleware)
  }

  get (path, ...handlers) {
    this.routes.GET[path] = handlers
  }

  post (path, ...handlers) {
    this.routes.POST[path] = handlers
  }

  put (path, ...handlers) {
    this.routes.PUT[path] = handlers
  }

  delete (path, ...handlers) {
    this.routes.DELETE[path] = handlers
  }

  patch (path, ...handlers) {
    this.routes.PATCH[path] = handlers
  }

  listen (port) {
    const { serve } = require('bun')
    serve({
      fetch: (req) => this._handleRequest(req),
      port
    })

    console.info(language.current().express_1, port)
  }

  async _handleRequest (req) {
    const { method, url } = req
    const path = new URL(url).pathname
    const bunResponse = new BunResponse()

    for (const middleware of this.middlewares) {
      await middleware(req)
    }

    const methodAllowed = this._checkMethod(method)
    if (!methodAllowed) return bunResponse.empty(req)

    const { handlers, params } = this._findHandler(method, path)
    if (!handlers) return bunResponse.simpleError(req, 404, language.current().express_2)

    req.params = params

    for (const handler of handlers) {
      const result = await handler(req)
      if (result instanceof Response) return result
    }

    return bunResponse.serverError(req)
  }

  _findHandler (method, path) {
    const params = {}
    const handlers = this.routes[method] ? this.routes[method][path] : null

    if (!handlers) {
      for (const [routePath, routeHandlers] of Object.entries(this.routes[method] || {})) {
        const routePatternParts = routePath.split('/').filter(Boolean)
        const pathParts = path.split('/').filter(Boolean)

        if (routePatternParts.length !== pathParts.length) continue

        let isMatch = true
        routePatternParts.forEach((part, index) => {
          if (part.startsWith(':')) params[part.slice(1)] = pathParts[index]
          else if (part !== pathParts[index]) isMatch = false
        })

        if (isMatch) return { handlers: routeHandlers, params }
      }

      return { handlers: null, params: {} }
    }

    return { handlers, params }
  }

  _checkMethod (method) {
    return ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)
  }
}
