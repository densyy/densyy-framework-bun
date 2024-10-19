const formatters = Object.freeze({
  'pt-BR': new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
  'en-US': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
  'fr-FR': new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
})

export default Object.freeze(
  class BunCurrency {
    toReal (value) {
      value = Number(value)
      return formatters['pt-BR'].format(value)
    }

    toDollar (value) {
      value = Number(value)
      return formatters['en-US'].format(value)
    }

    toEuro (value) {
      value = Number(value)
      return formatters['fr-FR'].format(value)
    }
  }
)
