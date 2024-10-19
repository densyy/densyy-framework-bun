import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

export default class BunPassword {
  async toHash (text, secret) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    return bcrypt.hash(this._protect(text, secret), salt)
  }

  async compare (text, hash, secret) {
    return bcrypt.compare(this._protect(text, secret), hash)
  }

  _protect (text, secret) {
    return `${text}${secret}`
  }
}
