export interface TransliterationMap {
  [key: string]: string
}

export interface ReplacementMap {
  [key: string]: string
}

export interface LanguagePack {
  transliterations?: TransliterationMap // Optional transliteration map for character-to-character replacements
  symbols?: ReplacementMap // Optional replacement map for symbol-to-text replacements
  customRules?: Array<(text: string) => string> // Optional array of custom transformation functions
}

export interface Options {
  locale: string
  separator?: string
  maintainCase?: boolean
  allowedCharacters?: string[]
}
