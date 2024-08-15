import { LanguagePack } from '../types.js'
import { englishLanguagePack } from './english/pack.js'

const packs = {
  en: englishLanguagePack
}

export const languagePacks: Map<string, LanguagePack> = new Map(
  Object.entries(packs)
)
