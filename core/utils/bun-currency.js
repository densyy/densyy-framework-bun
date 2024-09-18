export default class BunCurrency {
  constructor (value) {
    this.value = Number(value)
  }

  toReal () {
    return this._format('pt-BR', 'BRL')
  }

  toDollar () {
    return this._format('en-US', 'USD')
  }

  toEuro () {
    return this._format('fr-FR', 'EUR')
  }

  _format (language, currency) {
    const options = { style: 'currency', currency }
    return new Intl.NumberFormat(language, options).format(this.value)
  }
}
