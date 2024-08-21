import { describe, expect, it } from 'vitest'
import { applyReplacements } from '../apply-replacement.js'
import { LanguagePack } from '../types.js'

describe('applyReplacements', () => {
  it('should apply replacements correctly', () => {
    const languagePack: LanguagePack = {
      symbols: {
        '&': 'and',
        '@': 'at'
      }
    }

    const input = 'rock & roll @ home'
    const expectedOutput = 'rock and roll at home'
    const result = applyReplacements(input, languagePack)
    expect(result).toBe(expectedOutput)
  })

  it('should handle empty replacements', () => {
    const languagePack: LanguagePack = {
      symbols: {}
    }

    const input = 'hello world'
    const expectedOutput = 'hello world'
    const result = applyReplacements(input, languagePack)
    expect(result).toBe(expectedOutput)
  })

  it('should handle text with no matching replacements', () => {
    const languagePack: LanguagePack = {
      symbols: {
        '&': 'and',
        '@': 'at'
      }
    }

    const input = 'hello world'
    const expectedOutput = 'hello world'
    const result = applyReplacements(input, languagePack)
    expect(result).toBe(expectedOutput)
  })

  it('should apply multiple replacements', () => {
    const languagePack: LanguagePack = {
      symbols: {
        '&': 'and',
        '@': 'at',
        '#': 'number'
      }
    }

    const input = 'rock & roll @ home #1'
    const expectedOutput = 'rock and roll at home number1'
    const result = applyReplacements(input, languagePack)
    expect(result).toBe(expectedOutput)
  })

  it('should apply replacements case insensitively', () => {
    const languagePack: LanguagePack = {
      symbols: {
        HELLO: 'hi'
      }
    }

    const input = 'HELLO world'
    const expectedOutput = 'hi world'
    const result = applyReplacements(input, languagePack)
    expect(result).toBe(expectedOutput)
  })
})
