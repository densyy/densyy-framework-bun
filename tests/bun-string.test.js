import { describe, it, expect } from 'bun:test'
import BunString from '../core/utils/bun-string'

const bunString = new BunString()

describe('BunString', () => {
  it('Deve remover acentos corretamente', () => {
    expect(bunString.removeAccents('áéíóú ç ñ')).toBe('aeiou c n')
    expect(bunString.removeAccents('ãõâêî')).toBe('aoaei')
  })

  it('Deve converter uma string para slug', () => {
    expect(bunString.toSlug('Olá Mundo!')).toBe('ola-mundo')
    expect(bunString.toSlug('  Vue.js Framework  ')).toBe('vuejs-framework')
  })

  it('Deve capitalizar a primeira letra da string', () => {
    expect(bunString.capitalizeFirstLetter('hello')).toBe('Hello')
    expect(bunString.capitalizeFirstLetter('HELLO')).toBe('Hello')
  })

  it('Deve converter uma string para Title Case', () => {
    expect(bunString.toTitleCase('hello world')).toBe('Hello World')
    expect(bunString.toTitleCase('JAVA script')).toBe('Java Script')
  })

  it('Deve gerar um hash aleatório com o tamanho especificado', () => {
    const hash = bunString.generateRandomHash(10)
    expect(hash).toHaveLength(10)
    expect(hash).toMatch(/^[a-z0-9]+$/)
  })

  it('Deve retornar uma string vazia ao remover acentos de uma string vazia', () => {
    expect(bunString.removeAccents('')).toBe('')
  })

  it('Deve lidar com strings que já estão em formato slug', () => {
    expect(bunString.toSlug('vue-js-framework')).toBe('vue-js-framework')
  })
})
