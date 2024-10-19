import { test, expect } from 'bun:test'
import headersMiddleware from '../core/middlewares/bun-headers.js'

test('Middleware Headers deve definir corretamente os headers padrão', () => {
  const mockRequest = {}

  headersMiddleware(mockRequest)

  expect(mockRequest.responseHeaders.get('Content-Type')).toBe('application/json')
})
