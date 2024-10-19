import { write } from 'bun'
import BunString from '../utils/bun-string'

const bunString = new BunString()
const DEST = '/tmp'
const FIELD = 'file'

export default async function (req) {
  if (req.method !== 'POST') return
  if (!req.headers?.get('Content-Type')?.includes('multipart/form-data')) return

  const formData = await req.formData()
  const file = formData.get(FIELD)

  if (!(file instanceof File)) return

  const id = bunString.generateRandomHash(16)
  const filePath = `${DEST}/${id}-${file.name}`
  await write(filePath, await file.arrayBuffer())

  req.file = buildReturnObj(filePath, file)
  req.data = { ...(req.data || {}), ...getFields(formData) }
}

function buildReturnObj(filePath, file) {
  return Object.freeze({
    path: filePath,
    originalname: file.name,
    mimetype: file.type,
    size: file.size
  })
}

function getFields(formData) {
  const fields = Object.fromEntries(formData.entries())
  delete fields[FIELD]
  return fields
}
