import { test, expect } from 'bun:test'
import jsonMiddleware from '../core/middlewares/bun-json.js'

test('Middleware JSON deve processar apenas métodos permitidos e JSON válido', async () => {
  const mockRequest = {
    method: 'POST',
    headers: new Map([['Content-Type', 'application/json']]),
    json: async () => ({ mensagem: 'Olá, mundo!' })
  }

  await jsonMiddleware(mockRequest)
  expect(mockRequest.data).toEqual({ mensagem: 'Olá, mundo!' })
})

test('Middleware JSON não deve processar métodos não permitidos', async () => {
  const mockRequest = {
    method: 'GET',
    headers: new Map([['Content-Type', 'application/json']]),
    json: async () => ({ mensagem: 'Não deve ser processado' })
  }

  await jsonMiddleware(mockRequest)
  expect(mockRequest.data).toBeUndefined()
})

test('Middleware JSON não deve processar conteúdo não JSON', async () => {
  const mockRequest = {
    method: 'POST',
    headers: new Map([['Content-Type', 'text/plain']]),
    json: async () => ({ mensagem: 'Não deve ser processado' })
  }

  await jsonMiddleware(mockRequest)
  expect(mockRequest.data).toBeUndefined()
})
