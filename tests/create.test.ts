import { describe, expect, it } from 'vitest'
import { createSlug } from '../src/create-slug.js'

describe('getSlug create', () => {
  it('with symbols', () => {
    const getSlug = createSlug({
      lang: 'en',
      uric: true,
      uricNoSlash: true,
      mark: true
    })

    expect(getSlug('Foo (♥) ; Baz=Bar')).toBe('foo-(love)-;-baz=bar')
  })

  it('without options', () => {
    const getSlug = createSlug({})

    expect(getSlug('Foo Bar Baz')).toBe('foo-bar-baz')
  })

  it('with empty options', () => {
    const getSlug = createSlug({})

    expect(getSlug('Foo Bar Baz')).toBe('foo-bar-baz')
  })

  it('with maintainCase', () => {
    const getSlug = createSlug({
      maintainCase: true
    })

    expect(getSlug('Foo Bar Baz')).toBe('Foo-Bar-Baz')
  })

  it('with uric', () => {
    const getSlug = createSlug({
      uric: true
    })

    expect(getSlug(' :80:/Foo/Bar/Baz:Foo')).toBe(':80:/foo/bar/baz:foo')
  })

  it('with uricNoSlash', () => {
    const getSlug = createSlug({
      uricNoSlash: true
    })

    expect(getSlug('Foo/ Bar= Baz')).toBe('foo-bar=-baz')
  })

  it('with mark', () => {
    const getSlug = createSlug({
      mark: true
    })

    expect(getSlug('Foo* Bar Baz')).toBe('foo*-bar-baz')
  })

  it('with truncate', () => {
    const getSlug = createSlug({
      truncate: 15
    })

    expect(getSlug('Foo* Foobar FooBarBaz')).toBe('foo-foobar')
  })

  it('with separator', () => {
    const getSlug = createSlug({
      separator: '_'
    })

    expect(getSlug('Foo* Foobar FooBarBaz')).toBe('foo_foobar_foobarbaz')
  })

  it('with mark and maintainCase', () => {
    const getSlug = createSlug({
      mark: true,
      maintainCase: true
    })

    expect(getSlug('Foo* Bar Baz')).toBe('Foo*-Bar-Baz')
  })

  it('with custom chars replacement', () => {
    const getSlug = createSlug({
      custom: {
        '*': 'o'
      }
    })

    expect(getSlug('xyl*ph*n')).toBe('xylophon')
  })

  it('with custom chars leet replacement', () => {
    const getSlug = createSlug({
      custom: {
        a: '4',
        b: '8',
        e: '3',
        g: '6',
        l: '1',
        o: '0',
        s: '5',
        t: '7'
      },
      lang: false
    })

    expect(getSlug('apbpepgplpopspt')).toBe('4p8p3p6p1p0p5p7')
    expect(getSlug('papbpepgplpopsptp')).toBe('p4p8p3p6p1p0p5p7p')
    expect(getSlug('qabqegqloqst')).toBe('q48q36q10q57')
    expect(getSlug('abeglost')).toBe('48361057')
  })

  it.skip('with custom chars replacement with not allowed target char', () => {
    const getSlug = createSlug({
      custom: {
        o: '*'
      }
    })

    expect(getSlug('xylophon')).toBe('xyl-ph-n')
  })

  it('with custom chars replacement with allowed target char, option mark', () => {
    const getSlug = createSlug({
      custom: {
        o: '*'
      },
      mark: true
    })

    expect(getSlug('xylophon')).toBe('xyl*ph*n')
  })

  it('with custom chars replacement with option mark', () => {
    const getSlug = createSlug({
      custom: {
        '*': 'o'
      },
      mark: true
    })

    expect(getSlug('xyl*ph*n')).toBe('xylophon')
  })

  it('with custom char to string replacement', () => {
    const getSlug = createSlug({
      custom: {
        '*': 'STAR',
        q: 'qqq',
        and: '',
        or: ''
      }
    })

    expect(getSlug('xyl*ph*n')).toBe('xylstarphstarn')
    expect(getSlug('quack')).toBe('qqquack')
    expect(getSlug('Foo and Bar or Baz')).toBe('foo-bar-baz')
  })

  it('with custom string replacement', () => {
    const getSlug = createSlug({
      custom: {
        and: 'und',
        or: 'oder',
        '*': ' and '
      }
    })

    expect(getSlug('bus and train')).toBe('bus-und-train')
    expect(getSlug('bus or train')).toBe('bus-oder-train')
    expect(getSlug('busandtrain')).toBe('busandtrain')
    expect(getSlug('busortrain')).toBe('busortrain')
    expect(getSlug('bus*train')).toBe('bus-and-train')

    expect(getSlug('bus and train bus and train')).toBe(
      'bus-und-train-bus-und-train'
    )
    expect(getSlug('bus or train bus or train')).toBe(
      'bus-oder-train-bus-oder-train'
    )
    expect(getSlug('busandtrain busandtrain')).toBe('busandtrain-busandtrain')
    expect(getSlug('busortrain busortrain')).toBe('busortrain-busortrain')
  })

  it('with custom string replacement with option mark', () => {
    const getSlug = createSlug({
      custom: {
        '*': 'STAR',
        q: 'qqq',
        z: ''
      },
      mark: true
    })

    expect(getSlug('xyl*ph*n')).toBe('xylstarphstarn')
    expect(getSlug('qxxx')).toBe('qqqxxx')
    expect(getSlug('xxxqxxx')).toBe('xxxqqqxxx')
    expect(getSlug('qqq')).toBe('qqqqqqqqq')
    expect(getSlug('*q*')).toBe('starqqqstar')
    expect(getSlug('zoo')).toBe('oo')
    expect(getSlug('zooz')).toBe('oo')
  })

  it('with custom string replacement with option maintainCase', () => {
    const getSlug = createSlug({
      custom: {
        '*': 'STAR',
        q: 'qqq'
      },
      maintainCase: true
    })

    expect(getSlug('xyl*ph*n')).toBe('xylSTARphSTARn')
    expect(getSlug('qXXX')).toBe('qqqXXX')
    expect(getSlug('qqq')).toBe('qqqqqqqqq')
    expect(getSlug('*q*')).toBe('STARqqqSTAR')
  })
})
