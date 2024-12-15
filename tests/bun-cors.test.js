import { test, expect } from 'bun:test'
import corsMiddleware from '../core/middlewares/bun-cors'

test('Middleware CORS deve definir corretamente os headers', () => {
  const mockRequest = {
    responseHeaders: new Map()
  }

  corsMiddleware(mockRequest)

  expect(mockRequest.responseHeaders.get('Access-Control-Allow-Origin')).toBe('*')
  expect(mockRequest.responseHeaders.get('Access-Control-Allow-Methods')).toBe('GET, POST, PUT, DELETE, PATCH')
  expect(mockRequest.responseHeaders.get('Access-Control-Allow-Headers')).toBe('Content-Type, x-access-token')
})
