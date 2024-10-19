import BunResponse from '../tools/bun-response'
import language from '../languages/index'

const bunResponse = new BunResponse()
const regexMongoId = /^[0-9a-fA-F]{24}$/

export default function (req) {
  const ids = extractIds(req.params)

  if (ids.length && ids.every(id => regexMongoId.test(id))) return true

  return bunResponse.simpleError(req, 406, language.current().middlewares.ids_1)
}

function extractIds (params = {}) {
  return Object.entries(params)
    .filter(([key]) => /^id.*/.test(key))
    .map(([, value]) => value)
}
