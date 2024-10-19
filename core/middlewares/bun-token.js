import BunJWT from '../tools/bun-jwt'
import BunResponse from '../tools/bun-response'
import language from '../languages/index'

const bunJWT = new BunJWT()
const bunResponse = new BunResponse()
const tokenMissingMessage = language.current().middlewares.token_1
const tokenInvalidMessage = language.current().middlewares.token_2

export default function (req, ...secrets) {
  const token = req.headers?.get('x-access-token')
  if (!token) return sendError(req, 401, tokenMissingMessage)

  if (secrets.some(secret => bunJWT.verifyToken(token, secret))) return true

  return sendError(req, 401, tokenInvalidMessage)
}

function sendError (req, statusCode, message) {
  return bunResponse.simpleError(req, statusCode, message)
}
