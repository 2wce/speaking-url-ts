import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug translate arabic letters', () => {
  it('should be ', () => {
    expect(
      getSlug('بشس تاقفغقف  -  ت ب ي ق', {
        lang: 'ar'
      })
    ).toBe('bshs-taqfghqf-t-b-y-q')
  })
})
