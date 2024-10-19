import language from '../languages/index'

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

    if (values.length === 0) values.push({ value: undefined, path: fieldPath })

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

  _checkEmpty (value) {
    if (value === undefined) return true
    if (value === null) return true
    return false
  }

  required (field, value) {
    if (value === undefined || value === null || value === '') {
      this._addError(field, language.current().tools.validator.required(field))
    }
  }

  min (field, value, minValue) {
    if (this._checkEmpty(value)) return
    if (value < Number(minValue)) {
      this._addError(field, language.current().tools.validator.min(field, minValue))
    }
  }

  max (field, value, maxValue) {
    if (this._checkEmpty(value)) return
    if (value > Number(maxValue)) {
      this._addError(field, language.current().tools.validator.max(field, maxValue))
    }
  }

  minLength (field, value, minLength) {
    if (this._checkEmpty(value)) return
    if (value.length < Number(minLength)) {
      this._addError(field, language.current().tools.validator.minLength(field, minLength))
    }
  }

  maxLength (field, value, maxLength) {
    if (this._checkEmpty(value)) return
    if (value.length > Number(maxLength)) {
      this._addError(field, language.current().tools.validator.maxLength(field, maxLength))
    }
  }

  number (field, value) {
    if (this._checkEmpty(value)) return
    if (typeof value !== 'number') {
      this._addError(field, language.current().tools.validator.number(field))
    }
  }

  string (field, value) {
    if (this._checkEmpty(value)) return
    if (typeof value !== 'string') {
      this._addError(field, language.current().tools.validator.string(field))
    }
  }

  array (field, value) {
    if (this._checkEmpty(value)) return
    if (!Array.isArray(value)) {
      this._addError(field, language.current().tools.validator.array(field))
    }
  }

  boolean (field, value) {
    if (this._checkEmpty(value)) return
    if (typeof value !== 'boolean') {
      this._addError(field, language.current().tools.validator.boolean(field))
    }
  }

  email (field, value) {
    if (this._checkEmpty(value)) return
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      this._addError(field, language.current().tools.validator.email(field))
    }
  }

  url (field, value) {
    if (this._checkEmpty(value)) return
    try {
      new URL(value)
    } catch (_) {
      this._addError(field, language.current().tools.validator.url(field))
    }
  }

  date (field, value) {
    if (this._checkEmpty(value)) return
    if (isNaN(Date.parse(value))) {
      this._addError(field, language.current().tools.validator.date(field))
    }
  }

  size (field, value, sizeValue) {
    if (this._checkEmpty(value)) return
    const size = Number(sizeValue)
    if (typeof value === 'string' || Array.isArray(value)) {
      if (value.length !== size) {
        this._addError(field, language.current().tools.validator.size(field, size))
      }
    } else {
      this._addError(field, language.current().tools.validator.size_error(field))
    }
  }

  hex (field, value) {
    if (this._checkEmpty(value)) return
    const hexRegex = /^[0-9a-fA-F]+$/
    if (typeof value !== 'string' || !hexRegex.test(value)) {
      this._addError(field, language.current().tools.validator.hex(field))
    }
  }

  in (field, value, allowedValues) {
    if (this._checkEmpty(value)) return
    const valuesArray = allowedValues.split(',')
    if (!valuesArray.includes(value)) {
      this._addError(field, language.current().tools.validator.in(field, allowedValues))
    }
  }

  slug (field, value) {
    if (this._checkEmpty(value)) return
    const slugRegex = /^[0-9a-z-]+$/
    if (typeof value !== 'string' || !slugRegex.test(value)) {
      this._addError(field, language.current().tools.validator.slug(field))
    }
  }

  cpf (field, value) {
    if (this._checkEmpty(value)) return
    if (!this.isValidCPF(value)) {
      this._addError(field, language.current().tools.validator.cpf(field))
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
    if (this._checkEmpty(value)) return
    if (!this.isValidCNPJ(value)) {
      this._addError(field, language.current().tools.validator.cnpj(field))
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
    if (this._checkEmpty(value)) return
    const phoneBrRegex = /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/
    if (typeof value !== 'string' || !phoneBrRegex.test(value)) {
      this._addError(field, language.current().tools.validator.phoneBr(field))
    }
  }
}
