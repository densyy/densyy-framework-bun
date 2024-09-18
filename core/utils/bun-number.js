export default class BunNumber {
  toDecimal (value = 0) {
    const newValue = Number(value).toFixed(2)
    return Number(newValue)
  }

  random (min, max) {
    const random = Math.random() * (max - min + 1)
    return Math.floor(random) + min
  }

  roundUp (value, decimals) {
    const scaleFactor = Math.pow(10, decimals)
    const scaleVector = value * scaleFactor
    return (Math.ceil(scaleVector) / scaleFactor).toFixed(decimals)
  }

  roundDown (value, decimals) {
    const scaleFactor = Math.pow(10, decimals)
    const scaleVector = value * scaleFactor
    return (Math.floor(scaleVector) / scaleFactor).toFixed(decimals)
  }
}
