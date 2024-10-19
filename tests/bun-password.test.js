import { describe, it, expect, beforeEach } from 'bun:test'
import BunPassword from '../core/tools/bun-password'

const bunPassword = new BunPassword()
const secret = 'super-secret'
let hashedPassword

beforeEach(async () => {
  hashedPassword = await bunPassword.toHash('password123', secret)
})

describe('BunPassword', () => {
  it('Deve gerar um hash válido para uma senha', async () => {
    const hash = await bunPassword.toHash('password123', secret)
    expect(typeof hash).toBe('string')
    expect(hash.length).toBeGreaterThan(0)
  })

  it('Deve comparar corretamente uma senha e um hash', async () => {
    const isMatch = await bunPassword.compare('password123', hashedPassword, secret)
    expect(isMatch).toBe(true)
  })

  it('Deve retornar false para uma senha incorreta', async () => {
    const isMatch = await bunPassword.compare('wrongpassword', hashedPassword, secret)
    expect(isMatch).toBe(false)
  })

  it('Deve gerar hashes diferentes para senhas diferentes', async () => {
    const anotherHash = await bunPassword.toHash('differentPassword', secret)
    expect(anotherHash).not.toBe(hashedPassword)
  })

  it('Deve gerar hashes diferentes para o mesmo texto com segredos diferentes', async () => {
    const differentSecretHash = await bunPassword.toHash('password123', 'another-secret')
    expect(differentSecretHash).not.toBe(hashedPassword)
  })
})
