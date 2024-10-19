import { test, expect } from 'bun:test'
import BunResponse from '../core/tools/bun-response'

const mockHeaders = new Map([['Content-Type', 'application/json']])
const mockRequest = { responseHeaders: mockHeaders }

const STATUS_OK = 'ok'
const STATUS_ERROR = 'error'
const STATUS_CODE_SUCCESS = 200
const STATUS_CODE_CREATED = 201
const STATUS_CODE_SERVER_ERROR = 500

const bunResponse = new BunResponse()

async function getResponseBody(response) {
  const text = await response.text()
  return JSON.parse(text)
}

test('success() deve retornar uma resposta de sucesso', async () => {
  const response = bunResponse.success(mockRequest, 'Sucesso')
  const body = await getResponseBody(response)

  expect(response.status).toBe(STATUS_CODE_SUCCESS)
  expect(response.headers).toEqual(mockHeaders)
  expect(body).toEqual({
    status: STATUS_OK,
    statusCode: STATUS_CODE_SUCCESS,
    body: 'Sucesso'
  })
})

test('create() deve retornar uma resposta de criação', async () => {
  const response = bunResponse.create(mockRequest, 'Criado')
  const body = await getResponseBody(response)

  expect(response.status).toBe(STATUS_CODE_CREATED)
  expect(body).toEqual({
    status: STATUS_OK,
    statusCode: STATUS_CODE_CREATED,
    body: 'Criado'
  })
})

test('simpleError() deve retornar uma resposta de erro simples', async () => {
  const response = bunResponse.simpleError(mockRequest, 400, 'Erro simples')
  const body = await getResponseBody(response)

  expect(response.status).toBe(400)
  expect(body).toEqual({
    status: STATUS_ERROR,
    statusCode: 400,
    body: 'Erro simples'
  })
})

test('serverError() deve retornar uma resposta de erro interno', async () => {
  const response = bunResponse.serverError(mockRequest)
  const body = await getResponseBody(response)

  expect(response.status).toBe(STATUS_CODE_SERVER_ERROR)
  expect(body.status).toBe(STATUS_ERROR)
})

test('empty() deve retornar uma resposta vazia', async () => {
  const response = bunResponse.empty(mockRequest)
  const body = await getResponseBody(response)

  expect(response.status).toBe(STATUS_CODE_SUCCESS)
  expect(body).toEqual({
    status: STATUS_OK,
    statusCode: STATUS_CODE_SUCCESS,
    body: null
  })
})
