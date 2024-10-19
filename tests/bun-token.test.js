import { describe, expect, it } from 'bun:test'
import bunTokenMiddleware from '../core/middlewares/bun-token'
import BunJWT from '../core/tools/bun-jwt'
import language from '../core/languages/index'

const bunJWT = new BunJWT()
const tokenMissingMessage = language.current().middlewares.token_1
const tokenInvalidMessage = language.current().middlewares.token_2

async function getResponseBody(response) {
  const text = await response.text()
  return JSON.parse(text)
}

describe('Middleware bun-token', () => {
  it('deve retornar erro quando o token está ausente', async () => {
    const req = { headers: new Map([]) }

    const response = bunTokenMiddleware(req)
    const body = await getResponseBody(response)

    expect(response.status).toBe(401)
    expect(body.status).toBe('error')
    expect(body.statusCode).toBe(401)
    expect(body.body).toBe(tokenMissingMessage)
  })

  it('deve retornar erro quando o token é inválido', async () => {
    const req = {
      headers: new Headers({ 'x-access-token': 'token_invalido' }),
      responseHeaders: new Headers()
    }

    const secret = 'segredo_correto'
    const response = bunTokenMiddleware(req, secret)
    const body = await getResponseBody(response)

    expect(response.status).toBe(401)
    expect(body.status).toBe('error')
    expect(body.statusCode).toBe(401)
    expect(body.body).toBe(tokenInvalidMessage)
  })

  it('deve retornar true quando o token é válido', () => {
    const payload = { idUsuario: 123 }
    const secret = 'segredo_correto'
    const token = bunJWT.generateToken(payload, secret)

    const req = {
      headers: new Headers({ 'x-access-token': token }),
      responseHeaders: new Headers()
    }

    const result = bunTokenMiddleware(req, secret)

    expect(result).toBe(true)
  })

  it('deve autenticar com um dos múltiplos segredos', () => {
    const payload = { idUsuario: 456 }
    const secret1 = 'segredo1'
    const secret2 = 'segredo2'
    const token = bunJWT.generateToken(payload, secret2)

    const req = {
      headers: new Headers({ 'x-access-token': token }),
      responseHeaders: new Headers(),
    }

    const result = bunTokenMiddleware(req, secret1, secret2)

    expect(result).toBe(true)
  })

  it('deve retornar erro quando o token é assinado com um segredo diferente', async () => {
    const payload = { idUsuario: 789 }
    const token = bunJWT.generateToken(payload, 'segredo_errado')

    const req = {
      headers: new Headers({ 'x-access-token': token }),
      responseHeaders: new Headers(),
    }

    const secret = 'segredo_correto'
    const response = bunTokenMiddleware(req, secret)
    const body = await getResponseBody(response)

    expect(response.status).toBe(401)
    expect(body.status).toBe('error')
    expect(body.statusCode).toBe(401)
    expect(body.body).toBe(tokenInvalidMessage)
  })
})
