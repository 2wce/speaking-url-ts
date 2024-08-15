import { describe, expect, it } from 'vitest'
import { generateSlug } from '../../../generate-slug.js'

describe('generateSlug translate dhivehi letters', () => {
  it('should be correct', () => {
    expect(
      generateSlug('މއދކ ވ ރ ށ ރީތި', {
        locale: 'dv'
      })
    ).toBe('madhk-v-r-sh-reethi')
  })
})
