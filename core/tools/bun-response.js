import language from '../languages/index'

const STATUS_OK = 'ok'
const STATUS_ERROR = 'error'
const STATUS_CODE_SUCCESS = 200
const STATUS_CODE_CREATED = 201
const STATUS_CODE_SERVER_ERROR = 500
const SERVER_ERROR_MESSAGE = language.current().tools.response_1

export default Object.freeze(
  class BunResponse {
    success(req, message) {
      return this._sendResponse(req, STATUS_OK, STATUS_CODE_SUCCESS, message)
    }

    create(req, message) {
      return this._sendResponse(req, STATUS_OK, STATUS_CODE_CREATED, message)
    }

    simpleError(req, statusCode, message) {
      return this._sendResponse(req, STATUS_ERROR, statusCode, message)
    }

    serverError(req) {
      return this._sendResponse(req, STATUS_ERROR, STATUS_CODE_SERVER_ERROR, SERVER_ERROR_MESSAGE)
    }

    empty(req) {
      return this._sendResponse(req, STATUS_OK, STATUS_CODE_SUCCESS, null)
    }

    _sendResponse(req, status, statusCode, body) {
      return new Response(
        JSON.stringify({ status, statusCode, body }),
        {
          status: statusCode,
          headers: req.responseHeaders
        }
      )
    }
  }
)
