import language from '../languages/index'

export default class BunResponse {
  sucess (req, message) {
    return this._sendResponse(req, 'ok', 200, message)
  }

  create (req, message) {
    return this._sendResponse(req, 'ok', 201, message)
  }

  simpleError (req, statusCode, message) {
    return this._sendResponse(req, 'error', statusCode, message)
  }

  serverError (req) {
    const statusCode = 500
    const message = language.current().tools.response_1
    return this._sendResponse(req, 'error', statusCode, message)
  }

  empty (req) {
    return this._sendResponse(req, 'ok', 200, null)
  }

  _sendResponse (req, status, statusCode, body) {
    const headers = req.responseHeaders
    return new Response(
      JSON.stringify({ status, statusCode, body }),
      {
        status: statusCode,
        headers
      }
    )
  }
}
