import BunJWT from '../tools/bun-jwt'
import BunResponse from '../tools/bun-response'
import language from '../languages/index'

export default function bunToken (req, ...secrets) {
  const token = req.headers?.get('x-access-token')
  const bunResponse = new BunResponse()
  const bunJWT = new BunJWT()

  if (!token) return bunResponse.simpleError(req, 401, language.current().middlewares.token_1)

  for (const secret of secrets) {
    const tokenOk = bunJWT.verifyToken(token, secret)
    if (tokenOk) return true
  }
  return bunResponse.simpleError(req, 401, language.current().middlewares.token_2)
}
