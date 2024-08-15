import { describe, expect, it } from 'vitest'
import { generateSlug } from '../../../generate-slug.js'

describe('getSlug translate georgien letters', () => {
  it('should be correct', () => {
    expect(
      generateSlug('აბ', {
        locale: 'ge'
      })
    ).toBe('ab')
  })
})
