import { describe, it, expect, beforeEach, jest } from 'bun:test'
import BunExpress from '../core/bun-express'

let app

beforeEach(() => {
  app = new BunExpress()
})

describe('BunExpress', () => {
  it('deve registrar e lidar com uma rota GET', async () => {
    const handler = jest.fn(() => new Response('Hello World'))
    app.get('/hello', handler)

    const req = new Request('http://localhost/hello', { method: 'GET' })
    const res = await app._handleRequest(req)

    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Hello World')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('deve retornar 404 para rota não encontrada', async () => {
    const req = new Request('http://localhost/notfound', { method: 'GET' })
    const res = await app._handleRequest(req)

    expect(res.status).toBe(404)
    expect(await res.text()).toContain('Route not found')
  })

  it('deve executar middlewares corretamente', async () => {
    const middleware = jest.fn(async (req) => {
      req.customProperty = 'test'
    })
    const handler = jest.fn((req) => new Response(req.customProperty))

    app.use(middleware)
    app.get('/middleware', handler)

    const req = new Request('http://localhost/middleware', { method: 'GET' })
    const res = await app._handleRequest(req)

    expect(await res.text()).toBe('test')
    expect(middleware).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('deve registrar e lidar com uma rota POST', async () => {
    const handler = jest.fn(() => new Response('Posted'))
    app.post('/post', handler)

    const req = new Request('http://localhost/post', { method: 'POST' })
    const res = await app._handleRequest(req)

    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Posted')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('deve lidar com rotas PUT', async () => {
    const handler = jest.fn(() => new Response('Updated'))
    app.put('/put', handler)

    const req = new Request('http://localhost/put', { method: 'PUT' })
    const res = await app._handleRequest(req)

    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Updated')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('deve lidar com rotas DELETE', async () => {
    const handler = jest.fn(() => new Response('Deleted'))
    app.delete('/delete', handler)

    const req = new Request('http://localhost/delete', { method: 'DELETE' })
    const res = await app._handleRequest(req)

    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Deleted')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('deve lidar com rotas PATCH', async () => {
    const handler = jest.fn(() => new Response('Patched'))
    app.patch('/patch', handler)

    const req = new Request('http://localhost/patch', { method: 'PATCH' })
    const res = await app._handleRequest(req)

    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Patched')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('deve lidar com rotas dinâmicas', async () => {
    const handler = jest.fn((req) => new Response(`ID: ${req.params.id}`))
    app.get('/user/:id', handler)

    const req = new Request('http://localhost/user/123', { method: 'GET' })
    const res = await app._handleRequest(req)

    expect(await res.text()).toBe('ID: 123')
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
