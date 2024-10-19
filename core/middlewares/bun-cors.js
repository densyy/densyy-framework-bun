const corsHeaders = Object.freeze(
    new Map([
    ['Access-Control-Allow-Origin', '*'],
    ['Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH'],
    ['Access-Control-Allow-Headers', 'Content-Type, x-access-token']
  ])
)

export default function (req) {
  corsHeaders.forEach((value, header) => {
    req.responseHeaders.set(header, value)
  })
}
