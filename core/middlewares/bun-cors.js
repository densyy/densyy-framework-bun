export default function bunCors (req) {
  req.responseHeaders.append('Access-Control-Allow-Origin', '*')
  req.responseHeaders.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PUT,DELETE,PATCH')
  req.responseHeaders.append('Access-Control-Allow-Headers', 'Content-Type, x-access-token')
}
