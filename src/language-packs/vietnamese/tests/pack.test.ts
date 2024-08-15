import { beforeAll, describe, expect, test } from 'vitest'
import { addLanguagePack, generateSlug } from '../../../generate-slug.js'
import { englishLanguagePack } from '../pack.js'

describe('English Language Pack', () => {
  beforeAll(() => {
    addLanguagePack('en', englishLanguagePack)
  })

  test('should replace "&" with "and"', () => {
    const slug = generateSlug('Cats & Dogs', { locale: 'en' })
    expect(slug).toBe('cats-and-dogs')
  })

  test('should replace "@" with "at"', () => {
    const slug = generateSlug('Email me @ example.com', { locale: 'en' })
    expect(slug).toBe('email-me-at-example-com')
  })

  test('should apply custom rules to handle double hyphens', () => {
    const slug = generateSlug('Hello--World', { locale: 'en' })
    expect(slug).toBe('hello-world')
  })

  test('should trim leading and trailing hyphens', () => {
    const slug = generateSlug('---Hello World---', { locale: 'en' })
    expect(slug).toBe('hello-world')
  })
})
