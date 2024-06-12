import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('expect(getSlug config combinations', () => {
  it('should separate with configured character, with non-Base64 separator', () => {
    expect(
      getSlug('Foo, Bar Baz', {
        separator: '*',
        maintainCase: false
      })
    ).toBe('foo*bar*baz')

    expect(
      getSlug('Foo- Bar Baz', {
        separator: '*',
        maintainCase: false
      })
    ).toBe('foo-*bar*baz')

    expect(
      getSlug('Foo] Bar Baz', {
        separator: '*',
        maintainCase: false
      })
    ).toBe('foo*bar*baz')
  })

  it('should separate with configured character, with only Base64 characters allowed', () => {
    expect(
      getSlug('Foo, Bar Baz', {
        separator: '_',
        onlyBase64: true
      })
    ).toBe('foo_bar_baz')

    expect(
      getSlug('Foo- Bar Baz', {
        separator: '_',
        onlyBase64: true
      })
    ).toBe('foo-_bar_baz')

    expect(
      getSlug('Foo] Bar Baz', {
        separator: '_',
        onlyBase64: true
      })
    ).toBe('foo_bar_baz')
  })

  it('should separate with configured character, with smart trim', () => {
    expect(
      getSlug('Foobarbaz, Bar Baz', {
        separator: '_',
        truncate: 12
      })
    ).toBe('foobarbaz')

    expect(
      getSlug('Foobarbaz, Bar Baz', {
        separator: '_',
        truncate: 15
      })
    ).toBe('foobarbaz_bar')

    expect(
      getSlug(' Foobarbaz, Bar Baz', {
        separator: '_',
        truncate: 15
      })
    ).toBe('foobarbaz_bar')

    expect(
      getSlug('  Foobarbaz,    Bar Baz', {
        separator: '_',
        truncate: 15
      })
    ).toBe('foobarbaz_bar')
  })

  it('should maintain case characters, with non-Base64 separator', () => {
    expect(
      getSlug('Foo, Bar Baz', {
        maintainCase: true,
        separator: '*'
      })
    ).toBe('Foo*Bar*Baz')

    expect(
      getSlug('Foo- Bar Baz', {
        maintainCase: true,
        separator: '*'
      })
    ).toBe('Foo-*Bar*Baz')

    expect(
      getSlug('Foo] Bar Baz', {
        maintainCase: true,
        separator: '*'
      })
    ).toBe('Foo*Bar*Baz')
  })

  it('should maintain case characters, with only Base64 characters allowed', () => {
    expect(
      getSlug('Foo, Bar Baz', {
        maintainCase: true,
        uric: false,
        uricNoSlash: false,
        mark: false
      })
    ).toBe('Foo-Bar-Baz')

    expect(
      getSlug('Foo- Bar Baz', {
        maintainCase: true,
        uric: false,
        uricNoSlash: false,
        mark: false
      })
    ).toBe('Foo-Bar-Baz')

    expect(
      getSlug('Foo] Bar Baz', {
        maintainCase: true,
        uric: false,
        uricNoSlash: false,
        mark: false
      })
    ).toBe('Foo-Bar-Baz')
  })

  it('should maintain case characters, with smart trim', () => {
    expect(
      getSlug('Foobarbaz, Bar Baz', {
        maintainCase: true,
        truncate: 12
      })
    ).toBe('Foobarbaz')

    expect(
      getSlug('Foobarbaz, Bar Baz', {
        maintainCase: true,
        truncate: 15
      })
    ).toBe('Foobarbaz-Bar')

    expect(
      getSlug(' Foobarbaz, Bar Baz', {
        maintainCase: true,
        truncate: 15
      })
    ).toBe('Foobarbaz-Bar')

    expect(
      getSlug('  Foobarbaz,    Bar Baz', {
        maintainCase: true,
        truncate: 15
      })
    ).toBe('Foobarbaz-Bar')
  })

  it('should prefer Base64 characters only', () => {
    expect(
      getSlug('Foo, Bar Baz', {
        uric: false,
        uricNoSlash: false,
        mark: false
      })
    ).toBe('foo-bar-baz')

    expect(
      getSlug('Foo- Bar Baz', {
        uric: false,
        uricNoSlash: false,
        mark: false
      })
    ).toBe('foo-bar-baz')

    expect(
      getSlug('Foo] Bar Baz', {
        uric: false,
        uricNoSlash: false,
        mark: false
      })
    ).toBe('foo-bar-baz')

    expect(
      getSlug('Foo* Bar Baz', {
        uric: false,
        uricNoSlash: false,
        mark: false
      })
    ).toBe('foo-bar-baz')
  })
})
