const validationMessages = Object.freeze({
  required: (field) => `${field} is required.`,
  min: (field, minValue) => `${field} must be at least ${minValue}.`,
  max: (field, maxValue) => `${field} must be at most ${maxValue}.`,
  minLength: (field, minLength) => `${field} must have at least ${minLength} characters.`,
  maxLength: (field, maxLength) => `${field} must have at most ${maxLength} characters.`,
  number: (field) => `${field} must be a number.`,
  string: (field) => `${field} must be a string.`,
  array: (field) => `${field} must be an array.`,
  boolean: (field) => `${field} must be a boolean.`,
  email: (field) => `${field} must be a valid email.`,
  url: (field) => `${field} must be a valid URL.`,
  date: (field) => `${field} must be a valid date.`,
  size: (field, size) => `${field} must have exactly ${size} characters.`,
  size_error: (field) => `${field} must be a string or an array to validate size.`,
  hex: (field) => `${field} must be a valid hexadecimal.`,
  in: (field, allowedValues) => `${field} must be one of the following values: ${allowedValues}.`,
  slug: (field) => `${field} must contain only lowercase letters, numbers, and hyphens.`,
  cpf: (field) => `${field} must be a valid CPF.`,
  cnpj: (field) => `${field} must be a valid CNPJ.`,
  phoneBr: (field) => `${field} must be a valid phone number.`
})

const messages = Object.freeze({
  middlewares: {
    ids_1: 'The IDs are invalid.',
    token_1: 'Authentication token is missing.',
    token_2: 'Invalid authentication token.'
  },
  tools: {
    response_1: 'There was an internal error. Please try again later or contact support.',
    validator: validationMessages
  },
  express_1: 'Server listening on port',
  express_2: 'Route not found'
})

export default messages
