import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDb } from './db.js'
import { seedAdmin } from './auth.js'
import { authRouter } from './routes/auth.js'
import { blogRouter } from './routes/blogs.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const PORT = Number(process.env.PORT) || 4000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/samudra_astra'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

const app = express()

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
)
app.use(express.json({ limit: '8mb' }))

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRouter)
app.use('/api/blogs', blogRouter)

app.use((error, _req, res, _next) => {
  const status = error.status || 500
  res.status(status).json({
    ok: false,
    error: status === 500 ? 'Server error.' : error.message,
  })
})

async function start() {
  await connectDb(MONGODB_URI)
  await seedAdmin()
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`)
  })
}

start().catch((error) => {
  console.error('Failed to start server:', error.message)
  process.exit(1)
})
