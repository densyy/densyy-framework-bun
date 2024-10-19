import BunResponse from './tools/bun-response'
import language from './languages/index'
import { serve } from 'bun'

const bunResponse = new BunResponse()
const ALLOWED_METHODS = new Set(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])

export default Object.freeze(
  class BunExpress {
    constructor () {
      this.routes = new Map([
        ['GET', new Map()],
        ['POST', new Map()],
        ['PUT', new Map()],
        ['DELETE', new Map()],
        ['PATCH', new Map()]
      ])
      this.middlewares = []
    }

    use (middleware) {
      this.middlewares.push(middleware)
    }

    _addRoute (method, path, handlers) {
      this.routes.get(method).set(path, handlers)
    }

    get (path, ...handlers) {
      this._addRoute('GET', path, handlers)
    }

    post (path, ...handlers) {
      this._addRoute('POST', path, handlers)
    }

    put (path, ...handlers) {
      this._addRoute('PUT', path, handlers)
    }

    delete (path, ...handlers) {
      this._addRoute('DELETE', path, handlers)
    }

    patch (path, ...handlers) {
      this._addRoute('PATCH', path, handlers)
    }

    listen (port) {
      serve({
        fetch: (req) => this._handleRequest(req),
        port
      })
      console.info(language.current().express_1, port)
    }

    async _handleRequest (req) {
      const { method, url } = req
      const path = new URL(url).pathname

      for (const middleware of this.middlewares) {
        await middleware(req)
      }

      if (!ALLOWED_METHODS.has(method)) return bunResponse.empty(req)

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
      const methodRoutes = this.routes.get(method)
      const handlers = methodRoutes.get(path)

      if (handlers) return { handlers, params }

      for (const [routePath, routeHandlers] of methodRoutes) {
        const routePatternParts = routePath.split('/').filter(Boolean)
        const pathParts = path.split('/').filter(Boolean)

        if (routePatternParts.length !== pathParts.length) continue

        let isMatch = true
        for (let i = 0; i < routePatternParts.length; i++) {
          const part = routePatternParts[i]
          if (part.startsWith(':')) {
            params[part.slice(1)] = pathParts[i]
          } else if (part !== pathParts[i]) {
            isMatch = false
            break
          }
        }

        if (isMatch) return { handlers: routeHandlers, params }
      }

      return { handlers: null, params: {} }
    }
  }
)
