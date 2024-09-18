export default function bunHelmet (req) {
  req.responseHeaders.append('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

  req.responseHeaders.append('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  req.responseHeaders.append('Pragma', 'no-cache')
  req.responseHeaders.append('Expires', '0')

  req.responseHeaders.append('X-Content-Type-Options', 'nosniff')
  req.responseHeaders.delete('X-Powered-By')
  req.responseHeaders.delete('Server')
  req.responseHeaders.delete('ETag')
}
