import { RedisStore } from '@hono-rate-limiter/redis'
import { kv } from '@vercel/kv'
import { rateLimiter } from 'hono-rate-limiter'

const WINDOW_IN_MS = 15 * 60 * 1000 // 15 minutes

// Limit each IP to 100 requests per `window` (here, per 15 minutes).
const LIMIT = 100

export const limiter = rateLimiter({
  windowMs: WINDOW_IN_MS,
  limit: LIMIT,
  standardHeaders: 'draft-6',
  keyGenerator: (c) => c.req.header('cf-connecting-ip') ?? '', // Method to generate custom identifiers for clients.
  store: new RedisStore({ client: kv }) // Redis, MemoryStore, etc. See below.
})
