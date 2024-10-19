const validationMessages = Object.freeze({
  required: (field) => `${field} é obrigatório.`,
  min: (field, minValue) => `${field} deve ser no mínimo ${minValue}.`,
  max: (field, maxValue) => `${field} deve ser no máximo ${maxValue}.`,
  minLength: (field, minLength) => `${field} deve ter no mínimo ${minLength} caracteres.`,
  maxLength: (field, maxLength) => `${field} deve ter no máximo ${maxLength} caracteres.`,
  number: (field) => `${field} deve ser um número.`,
  string: (field) => `${field} deve ser uma string.`,
  array: (field) => `${field} deve ser um array.`,
  boolean: (field) => `${field} deve ser um booleano.`,
  email: (field) => `${field} deve ser um email válido.`,
  url: (field) => `${field} deve ser uma URL válida.`,
  date: (field) => `${field} deve ser uma data válida.`,
  size: (field, size) => `${field} deve ter exatamente ${size} caracteres.`,
  size_error: (field) => `${field} deve ser uma string ou um array para validar o tamanho.`,
  hex: (field) => `${field} deve ser um hexadecimal válido.`,
  in: (field, allowedValues) => `${field} deve ser um dos seguintes valores: ${allowedValues}.`,
  slug: (field) => `${field} deve conter apenas letras minúsculas, números e hífens.`,
  cpf: (field) => `${field} deve ser um CPF válido.`,
  cnpj: (field) => `${field} deve ser um CNPJ válido.`,
  phoneBr: (field) => `${field} deve ser um número de telefone válido.`
})

const messages = Object.freeze({
  middlewares: {
    ids_1: 'Os IDs são inválidos.',
    token_1: 'Token de autenticação inexistente.',
    token_2: 'Token de autenticação inválido.'
  },
  tools: {
    response_1: 'Houve um erro interno. Por favor tente novamente mais tarde ou entre em contato com o suporte.',
    validator: validationMessages
  },
  express_1: 'Servidor ouvindo na porta',
  express_2: 'Rota inexistente'
})

export default messages
