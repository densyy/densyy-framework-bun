import jwt from 'jsonwebtoken'

export default class BunJWT {
  generateToken (payload, secret, expiresIn = '7d') {
    const options = { expiresIn }
    return jwt.sign({ data: payload }, secret, options)
  }

  verifyToken (token, secret) {
    const suppressCallback = (_error, data) => data
    return jwt.verify(token, secret, null, suppressCallback)
  }

  getData (token) {
    return jwt.decode(token)
  }
}
