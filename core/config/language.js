const instanceData = new WeakMap()

class Singleton {
  constructor () {
    if (Singleton.instance) return Singleton.instance

    instanceData.set(this, { language: 'en_US' })
    Singleton.instance = this
    Object.freeze(this)
  }

  set (value) {
    if (!['pt_BR', 'en_US'].includes(value)) throw new Error('Language Error')
    instanceData.get(this).language = value
  }

  get () {
    return instanceData.get(this).language
  }
}

const instance = new Singleton()

export default instance
