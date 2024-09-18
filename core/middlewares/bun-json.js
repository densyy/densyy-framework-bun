export default async function bunJson (req) {
  const { method } = req
  const contentType = req.headers?.get('Content-Type')

  if (method !== 'POST' && method !== 'PUT' && method !== 'PATCH') return
  if (!contentType?.includes('application/json')) return

  const json = await req.json()
  req.data = json
}
