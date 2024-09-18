import bcrypt from 'bcryptjs'

export default class BunPassword {
  constructor () {
    this.saltRounds = 10
  }

  async toHash (text, secret) {
    const salt = await bcrypt.genSalt(this.saltRounds)
    const protectedText = this._protect(text, secret)
    return bcrypt.hash(protectedText, salt)
  }

  async compare (text, hash, secret) {
    const protectedText = this._protect(text, secret)
    return bcrypt.compare(protectedText, hash)
  }

  _protect (text, secret) {
    return text + secret
  }
}
