import { describe, it, expect, beforeEach } from 'bun:test'
import BunJWT from '../core/tools/bun-jwt'

const bunJWT = new BunJWT()
const secret = 'test-secret'
let token

beforeEach(() => {
  token = bunJWT.generateToken({ userId: 1 }, secret, '1d')
})

describe('BunJWT', () => {
  it('Deve gerar um token válido', () => {
    expect(typeof token).toBe('string')
    expect(token.split('.')).toHaveLength(3)
  })

  it('Deve verificar e retornar os dados do token', async () => {
    const data = await bunJWT.verifyToken(token, secret)
    expect(data).toBeTruthy()
    expect(data.data).toEqual({ userId: 1 })
  })

  it('Deve falhar ao verificar um token com segredo inválido', async () => {
    const data = await bunJWT.verifyToken(token, 'wrong-secret')
    expect(data).toBe(false)
  })

  it('Deve retornar os dados decodificados de um token', () => {
    const decodedData = bunJWT.getData(token)
    expect(decodedData).toBeTruthy()
    expect(decodedData.data).toEqual({ userId: 1 })
  })

  it('Deve retornar null para um token inválido na decodificação', () => {
    const decodedData = bunJWT.getData('invalid.token.here')
    expect(decodedData).toBeNull()
  })
})
