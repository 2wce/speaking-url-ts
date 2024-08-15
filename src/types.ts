export interface TransliterationMap {
  [key: string]: string
}

export interface ReplacementMap {
  [key: string]: string
}

export interface LanguagePack {
  transliterations?: TransliterationMap // Optional transliteration map for character-to-character replacements
  replacements?: ReplacementMap // Optional replacement map for specific characters or phrases
  stopWords?: string[] // Optional array of stop words to be removed
  customRules?: Array<(text: string) => string> // Optional array of custom transformation functions
}

export interface Options {
  locale: string
  separator?: string
  maintainCase?: boolean
  allowedCharacters?: string[]
}
