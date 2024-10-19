import { test, expect, spyOn } from 'bun:test'
import multerMiddleware from '../core/middlewares/bun-multer.js'
import * as bunModule from 'bun'

spyOn(bunModule, 'write').mockResolvedValue(true)

test('Middleware deve processar upload de arquivo corretamente', async () => {
  const mockFile = new File(['conteúdo do arquivo'], 'teste.txt', { type: 'text/plain' })

  const formData = new FormData()
  formData.append('file', mockFile)

  const mockRequest = {
    method: 'POST',
    headers: new Map([['Content-Type', 'multipart/form-data']]),
    formData: async () => formData,
    data: {}
  }

  await multerMiddleware(mockRequest)

  expect(mockRequest.file.path).toContain('teste.txt')
  expect(mockRequest.file.mimetype).toContain('text/plain')
  expect(mockRequest.file.size).toBeGreaterThan(17)
  expect(mockRequest.data).toEqual({})

})

test('Middleware deve ignorar requisições não-POST', async () => {
  const mockRequest = { method: 'GET', headers: new Map(), data: {} }
  await multerMiddleware(mockRequest)

  expect(mockRequest.file).toBeUndefined()
  expect(mockRequest.data).toEqual({})
})

test('Middleware deve ignorar requisições sem multipart/form-data', async () => {
  const mockRequest = {
    method: 'POST',
    headers: new Map([['Content-Type', 'application/json']]),
    data: {}
  }
  await multerMiddleware(mockRequest)

  expect(mockRequest.file).toBeUndefined()
  expect(mockRequest.data).toEqual({})
})
