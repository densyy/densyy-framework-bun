export default function bunHeaders (req) {
  req.responseHeaders = new Headers()
  req.responseHeaders.append('Content-Type', 'application/json')
}
