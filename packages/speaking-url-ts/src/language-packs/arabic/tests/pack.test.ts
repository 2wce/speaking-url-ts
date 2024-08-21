import { generateSlug } from '@/generate-slug.js'
import { describe, expect, test } from 'vitest'

describe('Arabic Language Pack', () => {
  test('correctly transliterate arabic', () => {
    const slug = generateSlug('بشس تاقفغقف  -  ت ب ي ق', { locale: 'ar' })
    expect(slug).toBe('bshs-taqfghqf-t-b-y-q')
  })
})
