import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug separator', () => {
  it('should separate with non-whitespace', () => {
    expect(
      getSlug('Foo Bar Baz', {
        separator: '-'
      })
    ).toBe('foo-bar-baz')

    expect(
      getSlug('Foo Bar Baz', {
        separator: '*'
      })
    ).toBe('foo*bar*baz')

    expect(
      getSlug('Foo Bar Baz', {
        separator: '_'
      })
    ).toBe('foo_bar_baz')

    expect(getSlug('Foo Bar Baz', '-')).toBe('foo-bar-baz')

    expect(getSlug('Foo Bar Baz', '*')).toBe('foo*bar*baz')

    expect(getSlug('Foo Bar Baz', '_')).toBe('foo_bar_baz')
  })

  it('should separate with non-whitespace, with trailing spaces', () => {
    expect(
      getSlug(' Foo Bar Baz ', {
        separator: '-'
      })
    ).toBe('foo-bar-baz')

    expect(
      getSlug('  Foo Bar Baz  ', {
        separator: '*'
      })
    ).toBe('foo*bar*baz')

    expect(
      getSlug('   Foo Bar Baz   ', {
        separator: '_'
      })
    ).toBe('foo_bar_baz')

    expect(getSlug(' Foo Bar Baz ', '-')).toBe('foo-bar-baz')

    expect(getSlug('  Foo Bar Baz  ', '*')).toBe('foo*bar*baz')

    expect(getSlug('   Foo Bar Baz   ', '_')).toBe('foo_bar_baz')
  })

  it('should separate with trailing separator "-"', () => {
    expect(
      getSlug('-Foo Bar Baz-', {
        separator: '-'
      })
    ).toBe('foo-bar-baz')

    expect(
      getSlug('--Foo Bar Baz---', {
        separator: '-'
      })
    ).toBe('foo-bar-baz')

    expect(
      getSlug('---Foo Bar Baz---', {
        separator: '-'
      })
    ).toBe('foo-bar-baz')

    expect(getSlug('-Foo Bar Baz-', '-')).toBe('foo-bar-baz')

    expect(getSlug('--Foo Bar Baz---', '-')).toBe('foo-bar-baz')

    expect(getSlug('---Foo Bar Baz---', '-')).toBe('foo-bar-baz')
  })

  it('should separate with trailing separator "*"', () => {
    expect(
      getSlug('*Foo Bar Baz*', {
        separator: '*'
      })
    ).toBe('foo*bar*baz')

    expect(
      getSlug('**Foo Bar Baz**', {
        separator: '*'
      })
    ).toBe('foo*bar*baz')

    expect(
      getSlug('***Foo Bar Baz***', {
        separator: '*'
      })
    ).toBe('foo*bar*baz')

    expect(getSlug('*Foo Bar Baz*', '*')).toBe('foo*bar*baz')

    expect(getSlug('**Foo Bar Baz**', '*')).toBe('foo*bar*baz')

    expect(getSlug('***Foo Bar Baz***', '*')).toBe('foo*bar*baz')
  })

  it('should separate with trailing separator "_"', () => {
    expect(
      getSlug('_Foo Bar Baz_', {
        separator: '_'
      })
    ).toBe('foo_bar_baz')

    expect(
      getSlug('__Foo Bar Baz__', {
        separator: '_'
      })
    ).toBe('foo_bar_baz')

    expect(
      getSlug('___Foo Bar Baz___', {
        separator: '_'
      })
    ).toBe('foo_bar_baz')

    expect(getSlug('_Foo Bar Baz_', '_')).toBe('foo_bar_baz')

    expect(getSlug('__Foo Bar Baz__', '_')).toBe('foo_bar_baz')

    expect(getSlug('___Foo Bar Baz___', '_')).toBe('foo_bar_baz')
  })

  it('should remove trailing separator "*"', () => {
    expect(
      getSlug(" C'est un beau titre qui ne laisse rien à désirer !", {
        separator: '*'
      })
    ).toBe('c*est*un*beau*titre*qui*ne*laisse*rien*a*desirer')

    expect(
      getSlug(" C'est un beau titre qui ne laisse rien à désirer !", '*')
    ).toBe('c*est*un*beau*titre*qui*ne*laisse*rien*a*desirer')
  })

  it('should return empty string because of non string input', () => {
    // @ts-expect-error
    expect(getSlug(true)).toBe('')
  })
})
