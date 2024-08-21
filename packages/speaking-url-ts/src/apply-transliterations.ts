import { LanguagePack } from './types.js'

export const applyTransliterations = (
  text: string,
  languagePack: LanguagePack
): string => {
  const transliterations = languagePack.transliterations ?? {}

  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  for (const [key, value] of Object.entries(transliterations)) {
    const escapedKey = escapeRegExp(key)
    const regex = new RegExp(escapedKey, 'g')
    text = text.replace(regex, value)
  }

  return text
}
