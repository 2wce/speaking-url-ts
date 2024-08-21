import { OpenAPIHono } from '@hono/zod-openapi'
import { zValidator } from '@hono/zod-validator'
import { apiReference } from '@scalar/hono-api-reference'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { handle } from 'hono/vercel'
import { generateSlug } from 'speaking-url-ts'
import { limiter } from './limiter.js'
import { route } from './validator.js'

export const config = {
  runtime: 'edge'
}

const app = new OpenAPIHono().basePath('/api')

// Apply the rate limiting middleware to all requests.
app.use(limiter)

// Apply the secure headers middleware to all requests.
app.use(secureHeaders())

// prettify JSON responses
app.use(prettyJSON())

app.openapi(route, (c) => {
  const data = c.req.valid('json')
  return c.json(
    {
      success: true,
      data: { slug: generateSlug(data.slug, data.options) }
    },
    200
  )
})

app.get(
  '/reference',
  apiReference({
    theme: 'bluePlanet',
    spec: {
      url: '/api/docs'
    }
  })
)

// The OpenAPI documentation will be available at /docs
app.doc('/docs', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API'
  }
})

export default handle(app)
