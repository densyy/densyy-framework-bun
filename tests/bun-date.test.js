import { describe, it, expect, beforeEach } from 'bun:test'
import BunDate from '../core/utils/bun-date'

let bunDate

beforeEach(() => {
  bunDate = new BunDate()
})

describe('BunDate', () => {
  it('Deve retornar a data atual', () => {
    const now = new Date()
    const result = bunDate.now()
    expect(result.getFullYear()).toBe(now.getFullYear())
    expect(result.getMonth()).toBe(now.getMonth())
    expect(result.getDate()).toBe(now.getDate())
  })

  it('Deve adicionar horas corretamente', () => {
    const result = bunDate.addHours(5)
    expect(result.getHours()).toBe(bunDate.now().getHours() + 5)
  })

  it('Deve adicionar dias corretamente', () => {
    const result = bunDate.addDays(2)
    expect(result.getDate()).toBe(bunDate.now().getDate() + 2)
  })

  it('Deve adicionar meses corretamente', () => {
    const result = bunDate.addMonths(1)
    expect(result.getMonth()).toBe(bunDate.now().getMonth() + 1)
  })

  it('Deve adicionar anos corretamente', () => {
    const result = bunDate.addYears(1)
    expect(result.getFullYear()).toBe(bunDate.now().getFullYear() + 1)
  })

  it('Deve formatar a data no formato BR', () => {
    const now = new Date()
    const expected = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`
    expect(bunDate.printDateBR()).toBe(expected)
  })

  it('Deve formatar a data e hora no formato BR', () => {
    const now = new Date()
    const expected = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    expect(bunDate.printDateTimeBR()).toBe(expected)
  })

  it('Deve formatar a data no formato USA', () => {
    const now = new Date()
    const expected = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
    expect(bunDate.printDateUSA()).toBe(expected)
  })

  it('Deve converter string BR para objeto Date', () => {
    const result = bunDate.dateStringBRtoDate('01/01/2024')
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(1)
  })

  it('Deve converter string USA para objeto Date', () => {
    const result = bunDate.dateStringUSAtoDate('2024-01-01')
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(1)
  })

  it('Deve criar um objeto Date a partir do ano, mês e dia', () => {
    const result = bunDate.dataObjtoDate(2024, 1, 1)
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(1)
  })
})
