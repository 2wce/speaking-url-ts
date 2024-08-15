import { describe, expect, test } from 'vitest'
import { generateSlug } from '../../../generate-slug.js'

describe('Arabic Language Pack', () => {
  test('correctly transliterate arabic', () => {
    const slug = generateSlug('بشس تاقفغقف  -  ت ب ي ق', { locale: 'ar' })
    expect(slug).toBe('bshs-taqfghqf-t-b-y-q')
  })
})
