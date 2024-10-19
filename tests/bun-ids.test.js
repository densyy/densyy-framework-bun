import { test, expect } from 'bun:test'
import bunIdsMiddleware from '../core/middlewares/bun-ids.js'
import language from '../core/languages/index'

async function getResponseBody(response) {
  const text = await response.text()
  return JSON.parse(text)
}

test('Middleware deve retornar true para IDs válidos', () => {
  const mockRequest = {
    params: { id1: '61504d2459f39f1203faa637', id2: '61504d2459f39f1203faa632' }
  }

  const result = bunIdsMiddleware(mockRequest)
  expect(result).toBe(true)
})

test('Middleware deve retornar erro para IDs inválidos', async () => {
  const mockRequest = { params: { id1: 'invalid-id', id2: '123' } }

  const response = bunIdsMiddleware(mockRequest)
  const body = await getResponseBody(response)

  expect(body).toEqual({
    statusCode: 406,
    status: 'error',
    body: language.current().middlewares.ids_1
  })
})
