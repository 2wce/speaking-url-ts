import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug defaults', function () {
  it('should replace whitespaces with separator', () => {
    expect(getSlug('foo bar baz')).toBe('foo-bar-baz')
  })

  it('should remove trailing space if any', () => {
    expect(getSlug(' foo bar baz ')).toBe('foo-bar-baz')
  })

  it('should remove multiple whitespaces', () => {
    expect(getSlug(' foo bar  baz   FOO    BAR      BAZ      ')).toBe(
      'foo-bar-baz-foo-bar-baz'
    )
  })

  it('should remove multiple separators at start and end', () => {
    expect(getSlug('-foo- bar -baz-')).toBe('foo-bar-baz')
    expect(getSlug('--foo- bar -baz---')).toBe('foo-bar-baz')
    expect(getSlug('---foo- bar -baz---')).toBe('foo-bar-baz')
  })

  it('should remove multple separators', () => {
    expect(getSlug('foo- bar -baz')).toBe('foo-bar-baz')
  })

  it('should remove non-base64 characters', () => {
    var nonBase64 = [
      '[',
      ']',
      ',',
      '*',
      '+',
      '~',
      '.',
      '(',
      ')',
      "'",
      '"',
      '!',
      ':',
      '@'
    ]

    for (var i = 0; i < nonBase64.length; i++) {
      expect(getSlug('foo ' + nonBase64[i] + ' bar baz')).toBe('foo-bar-baz')
    }
  })

  it('should remove trailing separator', () => {
    expect(
      getSlug("C'est un beau titre qui ne laisse rien à désirer  ! ")
    ).toBe('c-est-un-beau-titre-qui-ne-laisse-rien-a-desirer')
  })

  it('should handle whitespace after symbol', () => {
    expect(getSlug('∆299')).toBe('delta-299')
    expect(getSlug('∆world')).toBe('delta-world')
    expect(getSlug('∆-299')).toBe('delta-299')
    expect(getSlug('∆-world')).toBe('delta-world')

    expect(getSlug('(∆)299')).toBe('delta-299')
    expect(
      getSlug('(∆)299', {
        mark: true
      })
    ).toBe('(delta)299')

    expect(getSlug('∆299')).toBe('delta-299')
    expect(getSlug('∆world')).toBe('delta-world')

    expect(getSlug('Hello∆299')).toBe('hello-delta-299')
    expect(getSlug('299∆Hello')).toBe('299-delta-hello')
  })

  it('should not fail if symbol at the end', () => {
    expect(getSlug('test &')).toBe('test-and')
    expect(getSlug('test & ')).toBe('test-and')
    expect(getSlug('test &', '_')).toBe('test_and')
    expect(getSlug('test ♥')).toBe('test-love')
    expect(getSlug('test ♥ ')).toBe('test-love')
    expect(getSlug('test ♥  ')).toBe('test-love')
  })
})
