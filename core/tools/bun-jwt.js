import jwt from 'jsonwebtoken'

export default class BunJWT {
  generateToken (payload, secret, expiresIn = '7d') {
    return jwt.sign({ data: payload }, secret, { expiresIn })
  }

  verifyToken (token, secret) {
    return jwt.verify(token, secret, (_error, data) => data)
  }

  getData (token) {
    return jwt.decode(token)
  }
}
