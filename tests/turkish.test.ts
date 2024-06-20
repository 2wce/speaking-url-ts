import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug translate turkish letters', () => {
  it('umlaut should be single letter transliteration', () => {
    expect(
      getSlug('ÜÄÖŞĞüäöşğ', {
        lang: 'tr'
      })
    ).toBe('uaeosguaeosg')

    expect(
      getSlug('ÜÖÄŞĞ äüöşğ', {
        lang: 'tr'
      })
    ).toBe('uoaesg-aeuosg')
  })
})
