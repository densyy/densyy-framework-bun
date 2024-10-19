const defaultHeaders = Object.freeze(
  new Headers({ 'Content-Type': 'application/json' })
)

export default function (req) {
  req.responseHeaders = defaultHeaders
}
