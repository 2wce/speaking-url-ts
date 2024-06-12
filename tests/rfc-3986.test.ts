import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug rfc3986', function () {
  it('"uric" characters allowed', function (done) {
    const chars = [';', '?', ':', '@', '&', '=', '+', ',', '/']

    for (let i = 0; i < chars.length; i++) {
      expect(
        getSlug('foo ' + chars[i] + ' bar baz', {
          uric: true
        })
      ).toBe('foo-' + chars[i] + '-bar-baz')
    }
  })

  it('"uricNoSlash" characters allowed', function (done) {
    const chars = [';', '?', ':', '@', '&', '=', '+', ',']

    for (let i = 0; i < chars.length; i++) {
      expect(
        getSlug('foo ' + chars[i] + ' bar baz', {
          uricNoSlash: true
        })
      ).toBe('foo-' + chars[i] + '-bar-baz')
    }
  })

  it('"mark" characters allowed', function (done) {
    const chars = ['.', '!', '~', '*', "'", '(', ')']

    for (let i = 0; i < chars.length; i++) {
      expect(
        getSlug('foo ' + chars[i] + ' bar baz', {
          mark: true
        })
      ).toBe('foo-' + chars[i] + '-bar-baz')
    }
  })

  it('"uric" characters allowed, separator ";"', function (done) {
    const chars = ['?', ':', '@', '&', '=', '+', ',', '/']

    for (let i = 0; i < chars.length; i++) {
      expect(
        getSlug('foo ' + chars[i] + ' bar baz', {
          uric: true,
          separator: ';'
        })
      ).toBe('foo;' + chars[i] + ';bar;baz')
    }
  })

  it('"uric" characters allowed, separator ";" included in input string', function (done) {
    expect(
      getSlug('foo ; bar baz', {
        uric: true,
        separator: ';'
      })
    ).toBe('foo;bar;baz')
  })

  it('"uricNoSlash" characters allowed, separator ";"', function (done) {
    const chars = ['?', ':', '@', '&', '=', '+', ',']

    for (let i = 0; i < chars.length; i++) {
      expect(
        getSlug('foo ' + chars[i] + ' bar baz', {
          uricNoSlash: true,
          separator: ';'
        })
      ).toBe('foo;' + chars[i] + ';bar;baz')
    }
  })

  it('"uricNoSlash" characters allowed, separator ";" included in input string', function (done) {
    expect(
      getSlug('foo ; bar baz', {
        uric: true,
        separator: ';'
      })
    ).toBe('foo;bar;baz')
  })

  it('"mark" characters allowed, separator "."', function (done) {
    const chars = ['!', '~', '*', "'", '(', ')']

    for (let i = 0; i < chars.length; i++) {
      expect(
        getSlug('foo ' + chars[i] + ' bar baz', {
          mark: true,
          separator: '.'
        })
      ).toBe('foo.' + chars[i] + '.bar.baz')
    }
  })

  it('"mark" characters allowed, separator "." included in input string', function (done) {
    expect(
      getSlug('foo . bar baz', {
        uric: true,
        separator: '.'
      })
    ).toBe('foo.bar.baz')
  })
})
