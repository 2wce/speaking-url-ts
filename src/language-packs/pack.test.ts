import { describe, expect, it } from 'vitest'
import { generateSlug } from '../generate-slug.js'
import { languagePacks } from './packs.js'

describe('Language Packs Transliteration Tests', () => {
  languagePacks.forEach((pack, locale) => {
    describe(`Testing ${locale} language pack`, () => {
      const testCases =
        Object.entries(pack.transliterations || pack.symbols || {}) || []

      testCases.forEach(([input, expected]) => {
        it(`should transliterate "${input}" to "${expected}"`, () => {
          expect(
            generateSlug(input, {
              locale: locale
            })
          ).toBe(expected.toLowerCase())
        })
      })
    })
  })
})
