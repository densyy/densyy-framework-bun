import { describe, it, expect } from 'bun:test'
import BunNumber from '../core/utils/bun-number'

const bunNumber = new BunNumber()

describe('BunNumber', () => {
  it('Deve converter um valor para decimal com duas casas decimais', () => {
    expect(bunNumber.toDecimal(10.5678)).toBe(10.57)
    expect(bunNumber.toDecimal(10)).toBe(10.00)
  })

  it('Deve gerar um número aleatório dentro do intervalo', () => {
    const min = 1
    const max = 10
    const randomValue = bunNumber.random(min, max)
    expect(randomValue).toBeGreaterThanOrEqual(min)
    expect(randomValue).toBeLessThanOrEqual(max)
  })

  it('Deve arredondar o valor corretamente com o método especificado', () => {
    expect(bunNumber.round(10.555, 2, 'round')).toBe(10.56)
    expect(bunNumber.round(10.554, 2, 'round')).toBe(10.55)
  })

  it('Deve arredondar o valor para cima', () => {
    expect(bunNumber.roundUp(10.451, 2)).toBe(10.46)
    expect(bunNumber.roundUp(10.4, 1)).toBe(10.5)
  })

  it('Deve arredondar o valor para baixo', () => {
    expect(bunNumber.roundDown(10.459, 2)).toBe(10.45)
    expect(bunNumber.roundDown(10.9, 0)).toBe(10)
  })

  it('Deve retornar 0 quando valor inválido for passado para toDecimal', () => {
    expect(bunNumber.toDecimal('invalid')).toBe(0.00)
  })
})
