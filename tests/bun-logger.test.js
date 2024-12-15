import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import BunLogger from '../core/utils/bun-logger'

const bunLogger = new BunLogger()

describe('BunLogger', () => {
  let originalWrite
  let capturedMessages = []

  beforeEach(() => {
    originalWrite = process.stdout.write
    process.stdout.write = (message) => { capturedMessages.push(message) }
  })

  afterEach(() => {
    process.stdout.write = originalWrite
    capturedMessages = []
  })

  it('Deve gravar a mensagem corretamente no terminal', () => {
    const message = 'Test log message'
    bunLogger.log(message)
    console.log('Captured Messages:', capturedMessages)
    expect(capturedMessages[0]).toBe(message + '\n')
  })
})
