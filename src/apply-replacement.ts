import { LanguagePack } from './types.js'

export const applyReplacements = (
  text: string,
  languagePack: LanguagePack
): string => {
  const replacements = languagePack.symbols ?? {}

  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  for (const [key, value] of Object.entries(replacements)) {
    const escapedKey = escapeRegExp(key)
    const regex = new RegExp(escapedKey, 'g')
    text = text.replace(regex, value)
  }

  return text
}
