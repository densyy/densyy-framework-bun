import { test, expect, spyOn } from 'bun:test'
import bunIdsMiddleware from '../core/middlewares/bun-ids.js'
import BunResponse from '../core/tools/bun-response'
import language from '../core/languages/index'

test('Middleware deve retornar true para IDs válidos', () => {
  const mockRequest = {
    params: { id1: '61504d2459f39f1203faa637', id2: '61504d2459f39f1203faa632' }
  }

  const result = bunIdsMiddleware(mockRequest)
  expect(result).toBe(true)
})

test('Middleware deve retornar erro para IDs inválidos', () => {
  const mockRequest = {
    params: { id1: 'invalid-id', id2: '123' }
  }

  const bunResponseSpy = spyOn(BunResponse.prototype, 'simpleError')

  bunIdsMiddleware(mockRequest)

  expect(bunResponseSpy).toHaveBeenCalledWith(
    mockRequest,
    406,
    language.current().middlewares.ids_1
  )

  BunResponse.prototype.simpleError = bunResponseSpy.original
})
