import { createRoute, z } from '@hono/zod-openapi'

export const bodySchema = z.object({
  slug: z.string().openapi({
    param: {
      name: 'slug',
      in: 'path'
    },
    example: 'hello world'
  }),
  options: z.object({
    separator: z
      .string()
      .optional()
      .openapi({
        param: {
          name: 'separator',
          in: 'query'
        },
        example: '-'
      }),
    locale: z.string().openapi({
      param: {
        name: 'locale',
        in: 'query'
      },
      example: 'en'
    })
  })
})

export const responseSchema = z.object({
  data: z.object({
    slug: z.string().openapi({
      example: 'hello-world'
    })
  })
})

export const route = createRoute({
  method: 'post',
  path: '/transliterate',
  request: {
    body: {
      content: {
        'application/json': {
          schema: bodySchema
        }
      },
      required: true
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: responseSchema
        }
      },
      description: 'Retrieve the transliterated slug'
    }
  }
})
