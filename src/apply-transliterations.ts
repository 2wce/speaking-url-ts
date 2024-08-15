import { LanguagePack } from './types.js'

export const applyTransliterations = (
  text: string,
  languagePack: LanguagePack
): string => {
  const transliterations = languagePack.transliterations ?? {}

  for (const [key, value] of Object.entries(transliterations)) {
    const regex = new RegExp(key, 'g')
    text = text.replace(regex, value)
  }

  return text
}
