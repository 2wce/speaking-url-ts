import { getSlug } from './get-slug'

/**
 * createSlug curried(opts)(input)
 **/
export const createSlug = (opts: string | Record<string, any>) => {
  /**
   * getSlugWithConfig
   */
  return (input: string) => {
    return getSlug(input, opts)
  }
}
