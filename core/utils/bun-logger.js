export default Object.freeze(
  class BunLogger {
    constructor () {
      this.buffer = []
      this.isWriting = false
    }

    async log (message) {
      this.buffer.push(message + '\n')

      if (!this.isWriting) {
        this.isWriting = true
        await this._flush()
      }
    }

    async _flush () {
      if (this.buffer.length > 0) {
        const messagesToWrite = this.buffer.splice(0, this.buffer.length)
        await this._writeMessages(messagesToWrite)
        this.isWriting = false

        if (this.buffer.length > 0) await this._flush()
      }
    }

    _writeMessages (messages) {
      return new Promise((resolve, reject) => {
        process.stdout.write(messages.join(''), (error) => {
          if (error) return reject(error)
          resolve()
        })
      })
    }
  }
)
