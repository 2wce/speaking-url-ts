import { Options, getSlug } from './get-slug.js'

/**
 * Creates a slug generator function with predefined options.
 *
 * @param opts - The options to configure the slug generation. Can be a predefined string or a detailed configuration object.
 * @returns A function that takes an input string and returns a slug based on the provided options.
 */
export const createSlug = (opts: Options | string) => {
  if (typeof opts !== 'string' && typeof opts !== 'object') {
    throw new Error('Invalid options type. Expected a string or an object.')
  }

  /**
   * Generates a slug using the configured options.
   *
   * @param input - The input string to convert into a slug.
   * @returns The generated slug as a string.
   */
  return (input: string) => {
    // Input validation (example)
    if (typeof input !== 'string') {
      // @TODO: throw new Error('Invalid input type. Expected a string.')
      return ''
    }

    return getSlug(input, opts)
  }
}
