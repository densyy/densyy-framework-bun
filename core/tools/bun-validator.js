import language from '../languages/index'

const REGEX = Object.freeze({
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  hex: /^[0-9a-fA-F]+$/,
  slug: /^[0-9a-z-]+$/,
  phoneBr: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/
})

const getMessages = () => language.current().tools.validator

export default Object.freeze(
  class BunValidator {
    constructor (rules) {
      this.rules = rules
      this.errors = {}
    }

    async validate (data) {
      this.errors = {}
      await Promise.all(
        Object.entries(this.rules).map(async ([field, ruleString]) => {
          const rules = ruleString.split('|')
          await this._validateField(data, field, rules)
        })
      )
    }

    async _validateField (data, fieldPath, rules) {
      const values = this._getValuesByPath(data, fieldPath) || [{ value: undefined, path: fieldPath }]
      for (const { value, path } of values) {
        for (const rule of rules) {
          const [ruleName, ruleParam] = rule.split(':')
          const method = this[ruleName]
          if (typeof method === 'function') method.call(this, path, value, ruleParam)
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
      if (!parts.length) {
        values.push({ value: current, path: currentPath.slice(1) })
        return
      }
      const [part, ...rest] = parts
      if (part === '*' && Array.isArray(current)) {
        for (const [index, item] of current.entries()) {
          this._extractValues(item, rest, `${currentPath}.${index}`, values)
        }
      } else if (current != null && current.hasOwnProperty(part)) {
        this._extractValues(current[part], rest, `${currentPath}.${part}`, values)
      } else {
        const remainingPath = [part, ...rest].join('.')
        const fullPath = `${currentPath ? currentPath + '.' : ''}${remainingPath}`
        values.push({ value: undefined, path: fullPath })
      }
    }

    firstError () {
      return Object.values(this.errors).flat()[0] || null
    }

    _addError (field, message) {
      (this.errors[field] ??= []).push(message)
    }

    _checkEmpty (value) {
      return value == null || value === '' || value === undefined
    }

    required (field, value) {
      if (!this._checkEmpty(value)) return
      this._addError(field, getMessages().required(field))
    }

    min (field, value, minValue) {
      minValue = Number(minValue)
      if (this._checkEmpty(value)) return
      if (value < minValue) {
        this._addError(field, getMessages().min(field, minValue))
      }
    }

    max (field, value, maxValue) {
      maxValue = Number(maxValue)
      if (this._checkEmpty(value)) return
      if (value > maxValue) {
        this._addError(field, getMessages().max(field, maxValue))
      }
    }

    minLength (field, value, minLength) {
      minLength = Number(minLength)
      if (this._checkEmpty(value)) return
      if (value.length < minLength) {
        this._addError(field, getMessages().minLength(field, minLength))
      }
    }

    maxLength (field, value, maxLength) {
      maxLength = Number(maxLength)
      if (this._checkEmpty(value)) return
      if (value.length > maxLength) {
        this._addError(field, getMessages().maxLength(field, maxLength))
      }
    }

    number (field, value) {
      if (this._checkEmpty(value)) return
      if (typeof value !== 'number') {
        this._addError(field, getMessages().number(field))
      }
    }

    string (field, value) {
      if (this._checkEmpty(value)) return
      if (typeof value !== 'string') {
        this._addError(field, getMessages().string(field))
      }
    }

    array (field, value) {
      if (this._checkEmpty(value)) return
      if (!Array.isArray(value)) {
        this._addError(field, getMessages().array(field))
      }
    }

    boolean (field, value) {
      if (this._checkEmpty(value)) return
      if (typeof value !== 'boolean') {
        this._addError(field, getMessages().boolean(field))
      }
    }

    email (field, value) {
      if (this._checkEmpty(value)) return
      if (!REGEX.email.test(value)) {
        this._addError(field, getMessages().email(field))
      }
    }

    url (field, value) {
      if (this._checkEmpty(value)) return
      try {
        new URL(value)
      } catch {
        this._addError(field, getMessages().url(field))
      }
    }

    date (field, value) {
      if (this._checkEmpty(value)) return
      if (isNaN(Date.parse(value))) {
        this._addError(field, getMessages().date(field))
      }
    }

    size (field, value, sizeValue) {
      sizeValue = Number(sizeValue)
      if (this._checkEmpty(value)) return

      if (typeof value !== 'string' && !Array.isArray(value)) {
        this._addError(field, getMessages().size_error(field))
        return
      }

      if (value.length !== sizeValue) {
        this._addError(field, getMessages().size(field, sizeValue))
      }
    }

    hex (field, value) {
      if (this._checkEmpty(value)) return
      if (!REGEX.hex.test(value)) {
        this._addError(field, getMessages().hex(field))
      }
    }

    in (field, value, allowedValues) {
      if (this._checkEmpty(value)) return
      if (!allowedValues.split(',').includes(value)) {
        this._addError(field, getMessages().in(field, allowedValues))
      }
    }

    slug (field, value) {
      if (this._checkEmpty(value)) return
      if (!REGEX.slug.test(value)) {
        this._addError(field, getMessages().slug(field))
      }
    }

    cpf (field, value) {
      if (this._checkEmpty(value)) return
      if (!this.isValidCPF(value)) {
        this._addError(field, getMessages().cpf(field))
      }
    }

    isValidCPF (cpf) {
      cpf = cpf.replace(/\D/g, '')
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
      const calc = (n) => [...cpf].slice(0, n).reduce((s, d, i) => s + d * (n + 1 - i), 0) * 10 % 11 % 10
      return calc(9) === +cpf[9] && calc(10) === +cpf[10]
    }

    cnpj (field, value) {
      if (this._checkEmpty(value)) return
      if (!this.isValidCNPJ(value)) {
        this._addError(field, getMessages().cnpj(field))
      }
    }

    isValidCNPJ (cnpj) {
      cnpj = cnpj.replace(/\D/g, '')
      if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false

      const calc = (cnpj, length) => {
        const weights = length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        let sum = 0
        for (let i = 0; i < weights.length; i++) {
          sum += cnpj[i] * weights[i]
        }
        const result = sum % 11
        return result < 2 ? 0 : 11 - result
      }

      const checkDigit1 = calc(cnpj, 12)
      if (+cnpj[12] !== checkDigit1) return false

      const checkDigit2 = calc(cnpj, 13)
      if (+cnpj[13] !== checkDigit2) return false

      return true
    }

    phoneBr (field, value) {
      if (this._checkEmpty(value)) return
      if (!REGEX.phoneBr.test(value)) {
        this._addError(field, getMessages().phoneBr(field))
      }
    }
  }
)
