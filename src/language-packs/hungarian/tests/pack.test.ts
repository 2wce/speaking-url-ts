import { generateSlug } from '@/generate-slug.js'
import { describe, expect, it } from 'vitest'

describe('generateSlug translate hungarian letters', () => {
  it('umlaut should be single letter transliteration', () => {
    expect(
      generateSlug('AÁEÉIÍOÓÖŐUÚÜŰ', {
        locale: 'hu'
      })
    ).toBe('aaeeiioooouuuu')

    expect(
      generateSlug('aáeéiíoóöőuúüű', {
        locale: 'hu'
      })
    ).toBe('aaeeiioooouuuu')

    expect(
      generateSlug('AÁEÉIÍOÓÖŐUÚÜŰ AÁEÉIÍOÓÖŐUÚÜŰ', {
        locale: 'hu'
      })
    ).toBe('aaeeiioooouuuu-aaeeiioooouuuu')

    expect(
      generateSlug('aáeéiíoóöőuúüű aáeéiíoóöőuúüű', {
        locale: 'hu'
      })
    ).toBe('aaeeiioooouuuu-aaeeiioooouuuu')
  })
})
