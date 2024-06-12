import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug translate georgien letters', () => {
  it('should be ', () => {
    expect(
      getSlug('აბ', {
        lang: 'ge'
      })
    ).toBe('ab')
  })
})
