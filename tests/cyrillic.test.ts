import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug translate cyrillic letters', () => {
  it('should be ', () => {
    expect(getSlug('Пью')).toBe('pyu')
  })
})
