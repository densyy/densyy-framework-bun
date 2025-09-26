import language from './core/languages/index'
import BunExpress from './core/bun-express'

import bunCors from './core/middlewares/bun-cors'
import bunHeaders from './core/middlewares/bun-headers'
import bunHelmet from './core/middlewares/bun-helmet'
import bunIds from './core/middlewares/bun-ids'
import bunJson from './core/middlewares/bun-json'
import bunQuery from './core/middlewares/bun-query'
import bunMorgan from './core/middlewares/bun-morgan'
import bunToken from './core/middlewares/bun-token'
import bunMulter from './core/middlewares/bun-multer'

import BunJWT from './core/tools/bun-jwt'
import BunPassword from './core/tools/bun-password'
import BunResponse from './core/tools/bun-response'
import BunValidator from './core/tools/bun-validator'

import BunCurrency from './core/utils/bun-currency'
import BunDate from './core/utils/bun-date'
import BunNumber from './core/utils/bun-number'
import BunString from './core/utils/bun-string'
import BunLogger from './core/utils/bun-logger'

export default {
  language,
  BunExpress,
  middlewares: {
    bunCors,
    bunHeaders,
    bunHelmet,
    bunIds,
    bunJson,
    bunQuery,
    bunMorgan,
    bunToken,
    bunMulter
  },
  tools: {
    BunJWT,
    BunPassword,
    BunResponse,
    BunValidator
  },
  utils: {
    BunCurrency,
    BunDate,
    BunNumber,
    BunString,
    BunLogger
  }
}
