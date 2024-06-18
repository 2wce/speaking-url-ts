import { describe, expect, it } from 'vitest'
import { createSlug } from '../src/create-slug.js'

describe('getSlug translate sentence with accent words', () => {
  describe('default options', () => {
    const getSlug = createSlug({})

    it('single word', () => {
      expect(getSlug('Ánhanguera')).toBe('anhanguera')
    })

    it('middle of sentence', () => {
      expect(getSlug('foo Ánhanguera bar')).toBe('foo-anhanguera-bar')
    })

    it('beginning of sentence', () => {
      expect(getSlug('Ánhanguera foo bar')).toBe('anhanguera-foo-bar')
    })

    it('end of sentence', () => {
      expect(getSlug('Ánhanguera fooá')).toBe('anhanguera-fooa')
    })
  })

  describe('titlecase options', () => {
    const getSlug = createSlug({
      titleCase: [
        'a',
        'an',
        'and',
        'as',
        'at',
        'but',
        'by',
        'en',
        'for',
        'if',
        'in',
        'nor',
        'of',
        'on',
        'or',
        'per',
        'the',
        'to',
        'vs'
      ]
    })

    it('single word', () => {
      expect(getSlug('Ánhanguera')).toBe('Anhanguera')
    })

    it('middle of sentence', () => {
      expect(getSlug('foo Ánhanguera bar')).toBe('Foo-Anhanguera-Bar')
    })

    it('middle of sentence, with exception', () => {
      expect(getSlug('foo Ánhanguera And bar')).toBe('Foo-Anhanguera-and-Bar')
    })

    it('beginning of sentence', () => {
      expect(getSlug('Ánhanguera foo Ánhanguera')).toBe(
        'Anhanguera-Foo-Anhanguera'
      )
    })

    it('beginning of sentence, with exception', () => {
      expect(getSlug('Ánhanguera and Ánhanguera')).toBe(
        'Anhanguera-and-Anhanguera'
      )
    })

    it('end of sentence', () => {
      expect(getSlug('Ánhanguera foo bará')).toBe('Anhanguera-Foo-Bara')
    })

    it('end of sentence, with exception', () => {
      expect(getSlug('Ánhanguera foo and bará')).toBe('Anhanguera-Foo-and-Bara')
    })
  })
})
