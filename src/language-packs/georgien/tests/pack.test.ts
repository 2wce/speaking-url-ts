import { generateSlug } from '@/generate-slug.js'
import { describe, expect, it } from 'vitest'

describe('generateSlug translate georgien letters', () => {
  it('should be correct', () => {
    expect(
      generateSlug('აბ', {
        locale: 'ge'
      })
    ).toBe('ab')
  })
})
