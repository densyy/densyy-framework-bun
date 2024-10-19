import { test, expect, spyOn } from 'bun:test'
import morganMiddleware from '../core/middlewares/bun-morgan.js'

test('Middleware Morgan deve logar corretamente as informações de request', () => {
  const consoleSpy = spyOn(console, 'info')

  const mockRequest = {
    method: 'GET',
    url: '/api/test',
    headers: new Map([['X-Forwarded-For', '192.168.0.1']])
  }

  morganMiddleware(mockRequest)

  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringMatching(/^ACCESS: .* - GET \/api\/test 192\.168\.0\.1$/)
  )

  console.info = consoleSpy.original
})
