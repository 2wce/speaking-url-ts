import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug maintainCase', () => {
  it('should maintain case characters', () => {
    expect(
      getSlug('Foo, Bar Baz', {
        maintainCase: true
      })
    ).toBe('Foo-Bar-Baz')

    expect(
      getSlug('Foo- Bar Baz', {
        maintainCase: true
      })
    ).toBe('Foo-Bar-Baz')

    expect(
      getSlug('Foo] Bar Baz', {
        maintainCase: true
      })
    ).toBe('Foo-Bar-Baz')

    expect(
      getSlug('Foo > Bar ♥ Baz', {
        maintainCase: true
      })
    ).toBe('Foo-greater-than-Bar-love-Baz')
  })
})
