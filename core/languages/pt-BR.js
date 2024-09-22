export default {
  middlewares: {
    ids_1: 'Os IDs são inválidos.',
    token_1: 'Token de autenticação inexistente.',
    token_2: 'Token de autenticação inválido.'
  },
  tools: {
    response_1: 'Houve um erro interno. Por favor tente novamente mais tarde ou entre em contato com o suporte.',
    validator_required: (field) => `${field} é obrigatório.`,
    validator_min: (field, minValue) => `${field} deve ser no mínimo ${minValue}.`,
    validator_max: (field, maxValue) => `${field} deve ser no máximo ${maxValue}.`,
    validator_minLength: (field, minLength) => `${field} deve ter no mínimo ${minLength} caracteres.`,
    validator_maxLength: (field, maxLength) => `${field} deve ter no máximo ${maxLength} caracteres.`,
    validator_number: (field) => `${field} deve ser um número.`,
    validator_string: (field) => `${field} deve ser uma string.`,
    validator_array: (field) => `${field} deve ser um array.`,
    validator_boolean: (field) => `${field} deve ser um booleano.`,
    validator_email: (field) => `${field} deve ser um email válido.`,
    validator_url: (field) => `${field} deve ser uma URL válida.`,
    validator_date: (field) => `${field} deve ser uma data válida.`,
    validator_size: (field, size) => `${field} deve ter exatamente ${size} caracteres.`,
    validator_size_error: (field) => `${field} deve ser uma string ou um array para validar o tamanho.`,
    validator_hex: (field) => `${field} deve ser um hexadecimal válido.`,
    validator_in: (field, allowedValues) => `${field} deve ser um dos seguintes valores: ${allowedValues}.`,
    validator_slug: (field) => `${field} deve conter apenas letras minúsculas, números e hífens.`,
    validator_cpf: (field) => `${field} deve ser um CPF válido.`,
    validator_cnpj: (field) => `${field} deve ser um CNPJ válido.`,
    validator_phoneBr: (field) => `${field} deve ser um número de telefone válido.`,
  },
  express_1: 'Servidor ouvindo na porta',
  express_2: 'Rota inexistente'
}
