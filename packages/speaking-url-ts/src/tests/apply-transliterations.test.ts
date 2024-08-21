import { describe, expect, it } from 'vitest'
import { applyTransliterations } from '../apply-transliterations.js'
import { LanguagePack } from '../types.js'

describe('applyTransliterations', () => {
  it('should apply transliterations correctly', () => {
    const languagePack: LanguagePack = {
      transliterations: {
        ä: 'ae',
        ö: 'oe',
        ü: 'ue',
        ß: 'ss'
      }
    }

    const input = 'fäß'
    const expectedOutput = 'faess'
    const result = applyTransliterations(input, languagePack)
    expect(result).toBe(expectedOutput)
  })

  it('should handle empty transliterations', () => {
    const languagePack: LanguagePack = {
      transliterations: {}
    }

    const input = 'hello'
    const expectedOutput = 'hello'
    const result = applyTransliterations(input, languagePack)
    expect(result).toBe(expectedOutput)
  })

  it('should handle text with no matching transliterations', () => {
    const languagePack: LanguagePack = {
      transliterations: {
        ä: 'ae',
        ö: 'oe'
      }
    }

    const input = 'hello'
    const expectedOutput = 'hello'
    const result = applyTransliterations(input, languagePack)
    expect(result).toBe(expectedOutput)
  })

  it('should apply multiple transliterations', () => {
    const languagePack: LanguagePack = {
      transliterations: {
        ä: 'ae',
        ö: 'oe',
        ü: 'ue'
      }
    }

    const input = 'fäöü'
    const expectedOutput = 'faeoeue'
    const result = applyTransliterations(input, languagePack)
    expect(result).toBe(expectedOutput)
  })

  it('should apply transliterations case insensitively', () => {
    const languagePack: LanguagePack = {
      transliterations: {
        Ä: 'Ae',
        Ö: 'Oe',
        Ü: 'Ue'
      }
    }

    const input = 'FÄÖÜ'
    const expectedOutput = 'FAeOeUe'
    const result = applyTransliterations(input, languagePack)
    expect(result).toBe(expectedOutput)
  })
})
