import { describe, it, expect } from 'bun:test'
import BunCurrency from './../core/utils/bun-currency'

const bunCurrency = new BunCurrency()

describe('BunCurrency', () => {
  it('Deve formatar valor para Real Brasileiro (BRL)', () => {
    const currency = bunCurrency.toReal(1234.56)
    expect(currency).toBe('R$ 1.234,56')
  })

  it('Deve formatar valor para Dólar Americano (USD)', () => {
    const currency = bunCurrency.toDollar(1234.56)
    expect(currency).toBe('$1,234.56')
  })

  it('Deve formatar valor para Euro (EUR)', () => {
    const currency = bunCurrency.toEuro(1234.56)
    expect(currency).toBe('1 234,56 €')
  })

  it('Deve aceitar valores numéricos e strings numéricas', () => {
    const currencyFromString = bunCurrency.toReal('1000')
    const currencyFromNumber = bunCurrency.toReal(1000)

    expect(currencyFromString).toBe(currencyFromNumber)
  })

  it('Deve retornar "NaN" para valores inválidos', () => {
    const invalidCurrencyReal = bunCurrency.toReal('valor-invalido')
    const invalidCurrencyDollar = bunCurrency.toDollar('valor-invalido')
    const invalidCurrencyEuro = bunCurrency.toEuro('valor-invalido')
    expect(invalidCurrencyReal).toBe('R$ NaN')
    expect(invalidCurrencyDollar).toBe('$NaN')
    expect(invalidCurrencyEuro).toBe('NaN €')
  })
})
