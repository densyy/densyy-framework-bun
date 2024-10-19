export default function (req) {
  const date = new Date().toUTCString()
  const { method, url, headers } = req
  const ip = headers.get('X-Forwarded-For') || headers.get('X-Real-IP') || headers.get('Host')

  console.info(`ACCESS: ${date} - ${method} ${url} ${ip}`)
}
