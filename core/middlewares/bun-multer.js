import { write } from 'bun'
import BunString from '../utils/bun-string'

export default async function bunMulter (req) {
  const dest = '/tmp'
  const field = 'file'

  const { method } = req
  const contentType = req.headers?.get('Content-Type')

  if (method !== 'POST') return
  if (!contentType?.includes('multipart/form-data')) return

  const formData = await req.formData()
  const file = formData.get(field)

  if (!(file instanceof File)) return

  const id = new BunString().generateRandomHash(16)
  const filePath = `${dest}/${id}-${file.name}`
  const buffer = await file.arrayBuffer()
  await write(filePath, buffer)
  req.file = buildReturnObj(filePath, file)
}

function buildReturnObj (filePath, file) {
  return {
    path: filePath,
    originalname: file.name,
    mimetype: file.type,
    size: file.size
  }
}
