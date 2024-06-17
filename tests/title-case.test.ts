import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe.skip('getSlug titleCase', () => {
  it('should title-case the characters', () => {
    expect(
      getSlug('This is big foo', {
        titleCase: true
      })
    ).toBe('This-Is-Big-Foo')

    expect(
      getSlug('This is Big foo', {
        titleCase: true
      })
    ).toBe('This-Is-Big-Foo')

    expect(
      getSlug("Don't drink and drive", {
        titleCase: true
      })
    ).toBe('Don-t-Drink-And-Drive')
  })

  it('should title-case the characters with custom array', () => {
    expect(
      getSlug('This is yet foo and bar', {
        titleCase: ['and', 'yet']
      })
    ).toBe('This-Is-yet-Foo-and-Bar')

    expect(
      getSlug('This is a foo and an angry bird', {
        titleCase: ['a', 'an', 'and']
      })
    ).toBe('This-Is-a-Foo-and-an-Angry-Bird')

    expect(
      getSlug('This is a foo and an angry bird show', {
        titleCase: ['a']
      })
    ).toBe('This-Is-a-Foo-And-An-Angry-Bird-Show')

    expect(
      getSlug("Don't drink and drive", {
        titleCase: ['and']
      })
    ).toBe('Don-t-Drink-and-Drive')

    expect(
      getSlug("Don't drink and drive", {
        // @ts-expect-error
        titleCase: {}
      })
    ).toBe('Don-t-Drink-And-Drive')

    expect(
      getSlug("Don't drink and drive", {
        titleCase: {
          // @ts-expect-error
          drink: 'drive'
        }
      })
    ).toBe('Don-t-Drink-And-Drive')

    expect(
      getSlug("Don't drink and drive", {
        // @ts-expect-error
        titleCase: 42
      })
    ).toBe('Don-t-Drink-And-Drive')
  })
})
