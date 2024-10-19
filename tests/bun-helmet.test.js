import { test, expect } from 'bun:test'
import helmetMiddleware from '../core/middlewares/bun-helmet.js'

test('Middleware Helmet deve definir e remover corretamente os headers', () => {
  const mockRequest = {
    responseHeaders: new Map([
      ['X-Powered-By', 'Bun'],
      ['Server', 'BunServer'],
      ['ETag', '12345']
    ])
  }

  helmetMiddleware(mockRequest)

  expect(mockRequest.responseHeaders.get('Strict-Transport-Security'))
    .toBe('max-age=31536000; includeSubDomains; preload')
  expect(mockRequest.responseHeaders.get('Cache-Control'))
    .toBe('no-store, no-cache, must-revalidate, private')
  expect(mockRequest.responseHeaders.get('Pragma')).toBe('no-cache')
  expect(mockRequest.responseHeaders.get('Expires')).toBe('0')
  expect(mockRequest.responseHeaders.get('X-Content-Type-Options')).toBe('nosniff')

  expect(mockRequest.responseHeaders.has('X-Powered-By')).toBe(false)
  expect(mockRequest.responseHeaders.has('Server')).toBe(false)
  expect(mockRequest.responseHeaders.has('ETag')).toBe(false)
})
