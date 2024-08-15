import { applyReplacements } from './apply-replacement.js'
import { applyTransliterations } from './apply-transliterations.js'
import { languagePacks } from './language-packs/packs.js'
import { LanguagePack, Options } from './types.js'

const cache: Map<string, string> = new Map()

function createCacheKey(locale: string, separator: string, input: string) {
  const encode = (value: string) => encodeURIComponent(value)
  return `${encode(locale)}:${encode(separator)}:${encode(input)}`
}

/**
 * Adds a language pack for a specific locale. If a language pack already exists for the locale,
 * it merges the new pack with the existing one.
 *
 * @param {string} locale - The locale identifier (e.g., 'en', 'fr').
 * @param {LanguagePack} pack - The language pack to add.
 */
export function addLanguagePack(locale: string, pack: LanguagePack) {
  // Check if a language pack already exists for the given locale
  if (languagePacks.has(locale)) {
    // Retrieve the existing language pack
    const existingPack = languagePacks.get(locale) as LanguagePack
    // Merge the existing pack with the new pack and update the map
    languagePacks.set(locale, {
      ...existingPack,
      ...pack
    })
  } else {
    // If no existing pack, simply add the new pack to the map
    languagePacks.set(locale, pack)
  }
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
  if (languagePack.replacements) {
    slug = applyReplacements(slug, languagePack)
  }

  // Apply custom rules if defined in the language pack
  if (languagePack.customRules) {
    languagePack.customRules.forEach((rule) => {
      slug = rule(slug)
    })
  }

  // Format the slug: lowercase, trim, replace non-alphanumeric characters, and remove extra separators
  // Convert to lowercase if maintainCase is false
  slug = (maintainCase ? slug : slug.toLowerCase())
    .trim()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`${separator}+`, 'g'), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '')

  // Cache the result for future use
  cache.set(cacheKey, slug)

  return slug
}
