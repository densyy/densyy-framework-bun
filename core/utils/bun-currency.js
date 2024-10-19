const formatters = Object.freeze({
  'pt-BR': new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
  'en-US': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
  'fr-FR': new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
})

export default Object.freeze(
  class BunCurrency {
    constructor(value) {
      this.value = Number(value)
    }

    toReal() {
      return formatters['pt-BR'].format(this.value)
    }

    toDollar() {
      return formatters['en-US'].format(this.value)
    }

    toEuro() {
      return formatters['fr-FR'].format(this.value)
    }
  }
)
