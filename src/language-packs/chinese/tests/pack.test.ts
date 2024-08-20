import { addLanguagePack } from '@/add-language-pack.js'
import { generateSlug } from '@/generate-slug.js'
import { beforeAll, describe, expect, test } from 'vitest'
import { chineseLanguagePack } from '../pack.js'

describe('Chinese Language Pack', () => {
  beforeAll(() => {
    addLanguagePack('ch', chineseLanguagePack)
  })

  test('should replace consecutive characters', () => {
    const slug = generateSlug('你好～', { locale: 'ch' })
    expect(slug).toBe('cats-and-dogs')
  })
})
