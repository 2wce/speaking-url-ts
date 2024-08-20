import { applyReplacements } from './apply-replacement.js'
import { applyTransliterations } from './apply-transliterations.js'
import { languagePacks } from './language-packs/packs.js'
import { Options } from './types.js'

const cache: Map<string, string> = new Map()

function createCacheKey(locale: string, separator: string, input: string) {
  const encode = (value: string) => encodeURIComponent(value)
  return `${encode(locale)}:${encode(separator)}:${encode(input)}`
}

const createNonAlphanumericPattern = (separator: string, symbols: string) => {
  return new RegExp(`[^a-z0-9${separator}${symbols}]+`, 'gi')
}

/**
 * Generates a slug from the given input string based on the specified locale and separator.
 *
 * @param {string} input - The input string to generate a slug from.
 * @param {Object} [options] - Options for generating the slug.
 * @param {string} options.locale - The locale to use for generating the slug.
 * @param {string} [options.separator='-'] - The separator to use in the slug.
 * @returns {string} - The generated slug.
 * @throws {Error} - Throws an error if no language pack is found for the specified locale.
 */
export function generateSlug(input: string, options: Options): string {
  const { locale = 'en', separator = '-', maintainCase = false } = options

  // Early return for empty input
  if (!input) {
    return ''
  }

  // Check cache for existing slug
  const cacheKey = createCacheKey(locale, separator, input)

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as string
  }

  // Retrieve the language pack for the specified locale
  const languagePack = languagePacks.get(locale)

  // Throw an error if no language pack is found for the locale
  if (!languagePack) {
    throw new Error(`No language pack found for locale: ${locale}`)
  }

  let slug = input

  // Apply transliterations if defined in the language pack
  if (languagePack.transliterations) {
    slug = applyTransliterations(slug, languagePack)
  }

  // Apply replacements if defined in the language pack
  if (languagePack.symbols) {
    slug = applyReplacements(slug, languagePack)
  }

  // Apply custom rules if defined in the language pack
  if (languagePack.customRules) {
    languagePack.customRules.forEach((rule) => {
      slug = rule(slug)
    })
  }

  const symbols = Object.values(languagePack.symbols ?? {}).join('')

  // Create a regex pattern to match non-alphanumeric characters excluding the separator and language pack symbols
  const nonAlphanumericPattern = createNonAlphanumericPattern(
    separator,
    symbols
  )
  const separatorPattern = new RegExp(`${separator}+`, 'g')
  const trimPattern = new RegExp(`^${separator}|${separator}$`, 'g')

  // Format the slug: lowercase, trim, replace non-alphanumeric characters, and remove extra separators
  // Convert to lowercase if maintainCase is false
  slug = (maintainCase ? slug : slug.toLowerCase())
    .trim()
    .replace(nonAlphanumericPattern, separator)
    .replace(separatorPattern, separator)
    .replace(trimPattern, '')

  // Cache the result for future use
  cache.set(cacheKey, slug)

  return slug
}
