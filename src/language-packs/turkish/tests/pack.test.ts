import { describe, expect, it } from 'vitest'
import { generateSlug } from '../../../generate-slug.js'

describe('generateSlug translate turkish letters', () => {
  it('umlaut should be single letter transliteration', () => {
    expect(
      generateSlug('ÜÄÖüäö', {
        locale: 'tr'
      })
    ).toBe('uaeouaeo')

    expect(
      generateSlug('ÜÖÄ äüö', {
        locale: 'tr'
      })
    ).toBe('uoae-aeuo')
  })
})
