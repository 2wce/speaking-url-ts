import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug translate dhivehi letters', () => {
  it('should be ', () => {
    expect(
      getSlug('މއދކ ވ ރ ށ ރީތި', {
        lang: 'dv'
      })
    ).toBe('madhk-v-r-sh-reethi')
  })
})
