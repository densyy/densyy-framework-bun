export default class BunValidator {
  constructor (rules) {
    this.rules = rules
    this.errors = {}
  }

  validate (data) {
    this.errors = {}
    for (const field in this.rules) {
      const rules = this.rules[field].split('|')
      this._validateField(data, field, rules)
    }
  }

  _validateField (data, fieldPath, rules) {
    const values = this._getValuesByPath(data, fieldPath)

    for (const valueObj of values) {
      const { value, path } = valueObj

      for (const rule of rules) {
        const [ruleName, ruleParam] = rule.split(':')
        const methodName = ruleName

        if (typeof this[methodName] === 'function') this[methodName](path, value, ruleParam)
        else console.warn(`Unsupported validation: ${ruleName}`)
      }
    }
  }

  _getValuesByPath (data, path) {
    const parts = path.split('.')
    const values = []
    this._extractValues(data, parts, '', values)
    return values
  }

  _extractValues (current, parts, currentPath, values) {
    if (parts.length === 0) {
      values.push({ value: current, path: currentPath.slice(1) })
      return
    }

    const [part, ...rest] = parts
    if (part === '*') {
      if (Array.isArray(current)) {
        current.forEach((item, index) => {
          this._extractValues(item, rest, `${currentPath}.${index}`, values)
        })
      }
    } else {
      if (current && Object.prototype.hasOwnProperty.call(current, part)) {
        this._extractValues(current[part], rest, `${currentPath}.${part}`, values)
      }
    }
  }

  //
  // ERRORS
  //

  firstError () {
    for (const field in this.errors) {
      if (this.errors[field].length > 0) return this.errors[field][0]
    }
    return null
  }

  _addError (field, message) {
    if (!this.errors[field]) this.errors[field] = []
    this.errors[field].push(message)
  }

  //
  // RULES
  //

  required (field, value) {
    if (value === undefined || value === null || value === '') {
      this._addError(field, `${field} é obrigatório.`)
    }
  }

  min (field, value, minValue) {
    if (value < Number(minValue)) {
      this._addError(field, `${field} deve ser no mínimo ${minValue}.`)
    }
  }

  max (field, value, maxValue) {
    if (value > Number(maxValue)) {
      this._addError(field, `${field} deve ser no máximo ${maxValue}.`)
    }
  }

  minLength (field, value, minLength) {
    if (value.length < Number(minLength)) {
      this._addError(field, `${field} deve ter no mínimo ${minLength} caracteres.`)
    }
  }

  maxLength (field, value, maxLength) {
    if (value.length > Number(maxLength)) {
      this._addError(field, `${field} deve ter no máximo ${maxLength} caracteres.`)
    }
  }

  number (field, value) {
    if (typeof value !== 'number') {
      this._addError(field, `${field} deve ser um número.`)
    }
  }

  string (field, value) {
    if (typeof value !== 'string') {
      this._addError(field, `${field} deve ser uma string.`)
    }
  }

  array (field, value) {
    if (!Array.isArray(value)) {
      this._addError(field, `${field} deve ser um array.`)
    }
  }

  boolean (field, value) {
    if (typeof value !== 'boolean') {
      this._addError(field, `${field} deve ser um booleano.`)
    }
  }

  email (field, value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      this._addError(field, `${field} deve ser um email válido.`)
    }
  }

  url (field, value) {
    try {
      URL(value)
    } catch (_) {
      this._addError(field, `${field} deve ser uma URL válida.`)
    }
  }

  date (field, value) {
    if (isNaN(Date.parse(value))) {
      this._addError(field, `${field} deve ser uma data válida.`)
    }
  }

  size (field, value, sizeValue) {
    const size = Number(sizeValue)
    if (typeof value === 'string' || Array.isArray(value)) {
      if (value.length !== size) {
        this._addError(field, `${field} deve ter exatamente ${size} caracteres.`)
      }
    } else {
      this._addError(field, `${field} deve ser uma string ou um array para validar o tamanho.`)
    }
  }

  hex (field, value) {
    const hexRegex = /^[0-9a-fA-F]+$/
    if (typeof value !== 'string' || !hexRegex.test(value)) {
      this._addError(field, `${field} deve ser um hexadecimal válido.`)
    }
  }

  in (field, value, allowedValues) {
    const valuesArray = allowedValues.split(',')
    if (!valuesArray.includes(value)) {
      this._addError(field, `${field} deve ser um dos seguintes valores: ${allowedValues}.`)
    }
  }

  slug (field, value) {
    const slugRegex = /^[0-9a-z-]+$/
    if (typeof value !== 'string' || !slugRegex.test(value)) {
      this._addError(field, `${field} deve conter apenas letras minúsculas, números e hífens.`)
    }
  }

  cpf (field, value) {
    if (!this.isValidCPF(value)) {
      this._addError(field, `${field} deve ser um CPF válido.`)
    }
  }

  isValidCPF (cpf) {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

    let sum = 0
    let rest
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
    rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0
    if (rest !== parseInt(cpf.substring(9, 10))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
    rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0
    if (rest !== parseInt(cpf.substring(10, 11))) return false

    return true
  }

  cnpj (field, value) {
    if (!this.isValidCNPJ(value)) {
      this._addError(field, `${field} deve ser um CNPJ válido.`)
    }
  }

  isValidCNPJ (cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '')
    if (cnpj.length !== 14) return false
    if (/^(\d)\1{13}$/.test(cnpj)) return false

    let length = cnpj.length - 2
    let numbers = cnpj.substring(0, length)
    const digits = cnpj.substring(length)
    let sum = 0
    let pos = length - 7

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--
      if (pos < 2) pos = 9
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result !== parseInt(digits.charAt(0))) return false

    length += 1
    numbers = cnpj.substring(0, length)
    sum = 0
    pos = length - 7

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--
      if (pos < 2) pos = 9
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result !== parseInt(digits.charAt(1))) return false

    return true
  }

  phoneBr (field, value) {
    const phoneBrRegex = /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/
    if (typeof value !== 'string' || !phoneBrRegex.test(value)) {
      this._addError(field, `${field} deve ser um número de telefone válido.`)
    }
  }
}
