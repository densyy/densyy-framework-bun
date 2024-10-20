import { test, expect } from 'bun:test'
import BunValidator from '../core/tools/bun-validator'

test('BunValidator required validation', async () => {
  const validator = new BunValidator({
    name: 'required'
  })

  await validator.validate({ name: 'John Doe' })
  expect(validator.errors).toEqual({})

  await validator.validate({ name: '' })
  expect(validator.errors.name[0]).toBe('name is required.')

  await validator.validate({ })
  expect(validator.errors.name[0]).toBe('name is required.')
})

test('BunValidator min validation', async () => {
  const validator = new BunValidator({
    age: 'min:18'
  })

  await validator.validate({ age: 20 })
  expect(validator.errors).toEqual({})

  await validator.validate({ age: 16 })
  expect(validator.errors.age[0]).toBe('age must be at least 18.')
})

test('BunValidator max validation', async () => {
  const validator = new BunValidator({
    quantity: 'max:100'
  })

  await validator.validate({ quantity: 80 })
  expect(validator.errors).toEqual({})

  await validator.validate({ quantity: 120 })
  expect(validator.errors.quantity[0]).toBe('quantity must be at most 100.')
})

test('BunValidator minLength validation', async () => {
  const validator = new BunValidator({
    password: 'minLength:6'
  })

  await validator.validate({ password: 'secret' })
  expect(validator.errors).toEqual({})

  await validator.validate({ password: '123' })
  expect(validator.errors.password[0]).toBe('password must have at least 6 characters.')
})

test('BunValidator maxLength validation', async () => {
  const validator = new BunValidator({
    username: 'maxLength:10'
  })

  await validator.validate({ username: 'user123' })
  expect(validator.errors).toEqual({})

  await validator.validate({ username: 'verylongusername' })
  expect(validator.errors.username[0]).toBe('username must have at most 10 characters.')
})

test('BunValidator number validation', async () => {
  const validator = new BunValidator({
    price: 'number'
  })

  await validator.validate({ price: 100 })
  expect(validator.errors).toEqual({})

  await validator.validate({ price: '100' })
  expect(validator.errors).toEqual({})

  await validator.validate({ price: 'abc' })
  expect(validator.errors.price[0]).toBe('price must be a number.')
})

test('BunValidator string validation', async () => {
  const validator = new BunValidator({
    comment: 'string'
  })

  await validator.validate({ comment: 'This is a comment' })
  expect(validator.errors).toEqual({})

  await validator.validate({ comment: 123 })
  expect(validator.errors.comment[0]).toBe('comment must be a string.')
})

test('BunValidator array validation', async () => {
  const validator = new BunValidator({
    comments: 'array'
  })

  await validator.validate({ comments: ['1'] })
  expect(validator.errors).toEqual({})

  await validator.validate({ comments: [1, 2] })
  expect(validator.errors).toEqual({})

  await validator.validate({ comments: 'yes' })
  expect(validator.errors.comments[0]).toBe('comments must be an array.')
})

test('BunValidator boolean validation', async () => {
  const validator = new BunValidator({
    isActive: 'boolean'
  })

  await validator.validate({ isActive: true })
  expect(validator.errors).toEqual({})

  await validator.validate({ isActive: false })
  expect(validator.errors).toEqual({})

  await validator.validate({ isActive: 'yes' })
  expect(validator.errors.isActive[0]).toBe('isActive must be a boolean.')
})

test('BunValidator email validation', async () => {
  const validator = new BunValidator({
    email: 'email'
  })

  await validator.validate({ email: 'test@example.com' })
  expect(validator.errors).toEqual({})

  await validator.validate({ email: 'invalid-email' })
  expect(validator.errors.email[0]).toBe('email must be a valid email.')
})

test('BunValidator url validation', async () => {
  const validator = new BunValidator({
    website: 'url'
  })

  await validator.validate({ website: 'https://example.com' })
  expect(validator.errors).toEqual({})

  await validator.validate({ website: 'invalid-url' })
  expect(validator.errors.website[0]).toBe('website must be a valid URL.')
})

test('BunValidator date validation', async () => {
  const validator = new BunValidator({
    birthday: 'date'
  })

  await validator.validate({ birthday: '1990-01-01' })
  expect(validator.errors).toEqual({})

  await validator.validate({ birthday: new Date() })
  expect(validator.errors).toEqual({})

  await validator.validate({ birthday: 'not-a-date' })
  expect(validator.errors.birthday[0]).toBe('birthday must be a valid date.')
})

test('BunValidator size validation', async () => {
  const validator = new BunValidator({
    code: 'size:4'
  })

  await validator.validate({ code: '1234' })
  expect(validator.errors).toEqual({})

  await validator.validate({ code: [1, 2, 3, 4] })
  expect(validator.errors).toEqual({})

  await validator.validate({ code: '12345' })
  expect(validator.errors.code[0]).toBe('code must have exactly 4 characters.')

  await validator.validate({ code: true })
  expect(validator.errors.code[0]).toBe('code must be a string or an array to validate size.')
})

test('BunValidator hex validation', async () => {
  const validator = new BunValidator({
    color: 'hex'
  })

  await validator.validate({ color: 'FFAABB' })
  expect(validator.errors).toEqual({})

  await validator.validate({ color: '00ff00' })
  expect(validator.errors).toEqual({})

  await validator.validate({ color: 'GHIJKL' })
  expect(validator.errors.color[0]).toBe('color must be a valid hexadecimal.')
})

test('BunValidator in validation', async () => {
  const validator = new BunValidator({
    role: 'in:admin,user,guest'
  })

  await validator.validate({ role: 'admin' })
  expect(validator.errors).toEqual({})

  await validator.validate({ role: 'superuser' })
  expect(validator.errors.role[0]).toBe('role must be one of the following values: admin,user,guest.')
})

test('BunValidator slug validation', async () => {
  const validator = new BunValidator({
    permalink: 'slug'
  })

  await validator.validate({ permalink: 'my-new-post' })
  expect(validator.errors).toEqual({})

  await validator.validate({ permalink: 'Invalid Slug!' })
  expect(validator.errors.permalink[0]).toBe('permalink must contain only lowercase letters, numbers, and hyphens.')
})

test('BunValidator cpf validation', async () => {
  const validator = new BunValidator({
    cpf: 'cpf'
  })

  await validator.validate({ cpf: '514.700.360-61' })
  expect(validator.errors).toEqual({})

  await validator.validate({ cpf: '123.456.789-00' })
  expect(validator.errors.cpf[0]).toBe('cpf must be a valid CPF.')
})

test('BunValidator cnpj validation', async () => {
  const validator = new BunValidator({
    cnpj: 'cnpj'
  })

  await validator.validate({ cnpj: '53.477.948/0001-07' })
  expect(validator.errors).toEqual({})

  await validator.validate({ cnpj: '12.345.678/0001-00' })
  expect(validator.errors.cnpj[0]).toBe('cnpj must be a valid CNPJ.')
})

test('BunValidator phoneBr validation', async () => {
  const validator = new BunValidator({
    phone: 'phoneBr'
  })

  await validator.validate({ phone: '(11) 91234-5678' })
  expect(validator.errors).toEqual({})

  await validator.validate({ phone: '11 91234-5678' })
  expect(validator.errors).toEqual({})

  await validator.validate({ phone: '12345' })
  expect(validator.errors.phone[0]).toBe('phone must be a valid phone number.')
})

test('BunValidator multiple validations', async () => {
  const validator = new BunValidator({
    username: 'required|string|minLength:3|maxLength:10',
    email: 'required|email',
    age: 'required|number|min:18|max:65'
  })

  await validator.validate({
    username: 'john_doe',
    email: 'john@example.com',
    age: 30
  })
  expect(validator.errors).toEqual({})

  await validator.validate({
    username: 'jd',
    email: 'johnexample.com',
    age: 17
  })
  expect(validator.errors.username[0]).toBe('username must have at least 3 characters.')
  expect(validator.errors.email[0]).toBe('email must be a valid email.')
  expect(validator.errors.age[0]).toBe('age must be at least 18.')
})

test('BunValidator nested fields and wildcard', async () => {
  const validator = new BunValidator({
    'addresses.*.street': 'required',
    'addresses.*.city': 'required',
    'addresses.*.zip': 'size:5'
  })

  await validator.validate({
    addresses: [
      { street: '123 Main St', city: 'New York', zip: '10001' },
      { street: '456 Elm St', city: 'Los Angeles', zip: '90001' }
    ]
  })
  expect(validator.errors).toEqual({})

  await validator.validate({
    addresses: [
      { street: null, city: 'New York', zip: '10001' },
      { street: '456 Elm St', city: null, zip: '900120' }
    ]
  })
  expect(validator.errors['addresses.0.street'][0]).toBe('addresses.0.street is required.')
  expect(validator.errors['addresses.1.city'][0]).toBe('addresses.1.city is required.')
  expect(validator.errors['addresses.1.zip'][0]).toBe('addresses.1.zip must have exactly 5 characters.')
})

test('BunValidator firstError method', async () => {
  const validator = new BunValidator({
    username: 'required|minLength:3',
    password: 'required|minLength:6'
  })

  await validator.validate({
    username: '',
    password: '123'
  })

  const firstError = validator.firstError()
  expect(firstError).toBeTruthy()
  expect(typeof firstError).toBe('string')
})
