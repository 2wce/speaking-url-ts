import { languagePacks } from './language-packs/packs.js'
import { LanguagePack } from './types.js'

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
