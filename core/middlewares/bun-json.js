const allowedMethods = new Set(['POST', 'PUT', 'PATCH'])

export default async function (req) {
  const contentType = req.headers?.get('Content-Type')

  if (!allowedMethods.has(req.method)) return
  if (!contentType?.includes('application/json')) return

  req.data = await req.json()
}
