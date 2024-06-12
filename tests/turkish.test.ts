import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug translate turkish letters', () => {
  it('umlaut should be single letter transliteration', () => {
    expect(
      getSlug('ÜÄÖüäö', {
        lang: 'tr'
      })
    ).toBe('uaeouaeo')

    expect(
      getSlug('ÜÖÄ äüö', {
        lang: 'tr'
      })
    ).toBe('uoae-aeuo')
  })
})
