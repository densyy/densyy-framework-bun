class Singleton {
  constructor () {
    if (Singleton.instance) {
      return Singleton.instance
    }

    this.data = {}
    Singleton.instance = this
  }

  set (value) {
    const allowed = ['pt_BR', 'en_US']
    if (!allowed.includes(value)) throw new Error('Language Error')

    this.data.language = value
  }

  get () {
    const defaultLanguage = 'en_US'
    return this.data?.language || defaultLanguage
  }
}

const instance = new Singleton()
Object.freeze(instance)

export default instance
