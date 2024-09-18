export default function bunMorgan (req) {
  const date = new Date().toUTCString()
  const method = req.method
  const url = req.url
  const ip = req.headers.get('X-Forwarded-For') || req.headers.get('X-Real-IP') || req.headers.get('Host')
  console.info(`ACCESS: ${date} - ${method} ${url} ${ip}`)
}
