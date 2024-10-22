import BunResponse from './tools/bun-response'
import language from './languages/index'
import { serve } from 'bun'

const bunResponse = new BunResponse()
const ALLOWED_METHODS = Object.freeze(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
const getMessages = () => language.current()

export default Object.freeze(
  class BunExpress {
    constructor () {
      this.routes = this._initializeRoutes()
      this.middlewares = []
    }

    _initializeRoutes () {
      const routeMap = Object.create(null) // Menor overhead que `new Map()`
      for (const method of ALLOWED_METHODS) {
        routeMap[method] = Object.create(null)
      }
      return routeMap
    }

    use (middleware) {
      this.middlewares.push(middleware)
    }

    _addRoute (method, path, handlers) {
      this.routes[method][path] = handlers
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
        fetch: this._handleRequest.bind(this),
        port
      })
      console.info(getMessages().express_1, port)
    }

    async _handleRequest (req) {
      const { method, url } = req

      if (!this.routes[method]) {
        return bunResponse.empty(req)
      }

      const path = new URL(url).pathname

      if (this.middlewares.length > 0) {
        await this._executeMiddlewares(req)
      }

      const { handlers, params } = this._findHandler(method, path)
      if (!handlers) {
        return bunResponse.simpleError(req, 404, getMessages().express_2)
      }

      req.params = params
      return this._executeHandlers(handlers, req) || bunResponse.serverError(req)
    }

    async _executeMiddlewares (req) {
      for (let i = 0; i < this.middlewares.length; i++) {
        await this.middlewares[i](req)
      }
    }

    async _executeHandlers (handlers, req) {
      for (let i = 0; i < handlers.length; i++) {
        const result = await handlers[i](req)
        if (result instanceof Response) return result
      }
    }

    _findHandler (method, path) {
      const methodRoutes = this.routes[method]
      const directHandler = methodRoutes[path]
      if (directHandler) return { handlers: directHandler, params: {} }

      return this._matchDynamicRoute(methodRoutes, path) || { handlers: null, params: {} }
    }

    _matchDynamicRoute (methodRoutes, path) {
      const pathParts = path.split('/').filter(Boolean)

      for (const routePath in methodRoutes) {
        const routePatternParts = routePath.split('/').filter(Boolean)
        if (routePatternParts.length !== pathParts.length) continue

        const params = Object.create(null)
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

        if (isMatch) return { handlers: methodRoutes[routePath], params }
      }
      return null
    }
  }
)
