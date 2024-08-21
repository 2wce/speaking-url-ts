import { generateSlug } from '@/generate-slug.js'
import { describe, expect, it } from 'vitest'

describe.todo('generateSlug translate hindi letters', () => {
  it('should be correct', () => {
    expect(
      generateSlug('कौतुकास्पद! दिवसा', {
        locale: 'hi'
      })
    ).toBe('kaautaukaasapada-daivasaa')
    expect(
      generateSlug('कौतुकास्पद! दिवसा ∞', {
        locale: 'hi'
      })
    ).toBe('kaautaukaasapada-daivasaa-ananta')
  })
})
