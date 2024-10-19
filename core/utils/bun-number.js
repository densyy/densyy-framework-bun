export default class BunNumber {
  toDecimal (value = 0) {
    return Number(Number(value).toFixed(2))
  }

  random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  round (value, decimals, method) {
    const scaleFactor = 10 ** decimals
    return (Math[method](value * scaleFactor) / scaleFactor).toFixed(decimals)
  }

  roundUp (value, decimals) {
    return this.round(value, decimals, 'ceil')
  }

  roundDown (value, decimals) {
    return this.round(value, decimals, 'floor')
  }
}
