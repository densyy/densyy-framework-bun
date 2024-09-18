import BunResponse from '../tools/bun-response'
import language from '../languages/index'

export default function bunIds (req) {
  const bunResponse = new BunResponse()
  const params = req.params || {}
  const ids = extractIds(params)

  if (areValidIds(ids)) return true

  return bunResponse.simpleError(req, 406, language.current().middlewares.ids_1)
}

function extractIds (params = {}) {
  return Object.entries(params)
    .filter(([key]) => /^id.*/.test(key))
    .map(([_key, value]) => value)
}

function areValidIds (ids) {
  const regexMongoId = /^[0-9a-fA-F]{24}$/
  return ids.every(id => regexMongoId.test(id))
}
