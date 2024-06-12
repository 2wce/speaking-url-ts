import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug smart truncate', function () {
  it('should maintain case characters, with smart truncate', function (done) {
    expect(
      getSlug('Foobarbaz, Bar Baz', {
        truncate: 12
      })
    ).toBe('foobarbaz')

    expect(
      getSlug('Foobarbaz, Bar Baz', {
        truncate: 15
      })
    ).toBe('foobarbaz-bar')

    expect(
      getSlug(' Foobarbaz, Bar Baz', {
        truncate: 15
      })
    ).toBe('foobarbaz-bar')

    expect(
      getSlug('  Foobarbaz,    Bar Baz', {
        truncate: 15
      })
    ).toBe('foobarbaz-bar')

    expect(
      getSlug('Foo Foo bar Zoo Bar Baz', {
        truncate: 15
      })
    ).toBe('foo-foo-bar-zoo')

    expect(
      getSlug('Foo Foo bar ZooBar Baz', {
        truncate: 15
      })
    ).toBe('foo-foo-bar')

    expect(
      getSlug('Foo Foo bar ZooBar Baz', {
        truncate: 15
      })
    ).toBe('foo-foo-bar')

    expect(
      getSlug('Foo Foo Bar Bar', {
        // @ts-expect-error
        truncate: 'foo'
      })
    ).toBe('foo-foo-bar-bar')

    expect(
      getSlug('Foo Foo Bar Bar', {
        // @ts-expect-error
        truncate: false
      })
    ).toBe('foo-foo-bar-bar')

    expect(
      getSlug('Foo Foo Bar Bar', {
        // @ts-expect-error
        truncate: true
      })
    ).toBe('foo-foo-bar-bar')

    expect(
      getSlug('a Foo', {
        // @ts-expect-error
        truncate: true
      })
    ).toBe('a-foo')
  })
})
