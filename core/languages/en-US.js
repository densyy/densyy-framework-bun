export default {
  middlewares: {
    ids_1: 'The IDs are invalid.',
    token_1: 'Authentication token is missing.',
    token_2: 'Invalid authentication token.'
  },
  tools: {
    response_1: 'There was an internal error. Please try again later or contact support.',
    validator_required: (field) => `${field} is required.`,
    validator_min: (field, minValue) => `${field} must be at least ${minValue}.`,
    validator_max: (field, maxValue) => `${field} must be at most ${maxValue}.`,
    validator_minLength: (field, minLength) => `${field} must have at least ${minLength} characters.`,
    validator_maxLength: (field, maxLength) => `${field} must have at most ${maxLength} characters.`,
    validator_number: (field) => `${field} must be a number.`,
    validator_string: (field) => `${field} must be a string.`,
    validator_array: (field) => `${field} must be an array.`,
    validator_boolean: (field) => `${field} must be a boolean.`,
    validator_email: (field) => `${field} must be a valid email.`,
    validator_url: (field) => `${field} must be a valid URL.`,
    validator_date: (field) => `${field} must be a valid date.`,
    validator_size: (field, size) => `${field} must have exactly ${size} characters.`,
    validator_size_error: (field) => `${field} must be a string or an array to validate size.`,
    validator_hex: (field) => `${field} must be a valid hexadecimal.`,
    validator_in: (field, allowedValues) => `${field} must be one of the following values: ${allowedValues}.`,
    validator_slug: (field) => `${field} must contain only lowercase letters, numbers, and hyphens.`,
    validator_cpf: (field) => `${field} must be a valid CPF.`,
    validator_cnpj: (field) => `${field} must be a valid CNPJ.`,
    validator_phoneBr: (field) => `${field} must be a valid phone number.`,
  },
  express_1: 'Server listening on port',
  express_2: 'Route not found'
}
