export default function (req) {
  try {
    const urlObj = new URL(req.url)
    const params = new URLSearchParams(urlObj.search)
    const obj = {}
    for (let [key, value] of params) {
      obj[key] = value
    }
    return obj
  } catch (error) {
    return {}
  }
}
