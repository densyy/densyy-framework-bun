import jwt from 'jsonwebtoken'

export default Object.freeze(
  class BunJWT {
    generateToken (payload, secret, expiresIn = '7d') {
      return jwt.sign({ data: payload }, secret, { expiresIn })
    }

    verifyToken (token, secret) {
      return new Promise((resolve) => {
        jwt.verify(token, secret, (error, data) => {
          if (error) resolve(false)
          else resolve(data)
        })
      })
    }

    getData (token) {
      return jwt.decode(token)
    }
  }
)
