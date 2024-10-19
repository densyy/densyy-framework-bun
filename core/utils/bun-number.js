export default Object.freeze(
  class BunNumber {
    toDecimal (value = 0) {
      if (typeof value !== 'number') value = 0
      return Number(Number(value).toFixed(2))
    }

    random (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    round (value, decimals, method) {
      const scaleFactor = Math.pow(10, decimals)
      let scaledValue = value * scaleFactor + 1e-8

      if (method === 'ceil') scaledValue = Math.ceil(scaledValue)
      else if (method === 'floor') scaledValue = Math.floor(scaledValue)
      else if (method === 'round') scaledValue = Math.round(scaledValue)

      const result = scaledValue / scaleFactor
      return Number(result.toFixed(decimals))
    }

    roundUp (value, decimals) {
      return this.round(value, decimals, 'ceil')
    }

    roundDown (value, decimals) {
      return this.round(value, decimals, 'floor')
    }
  }
)
