import { LanguagePack } from '../types.js'
import { arabicLanguagePack } from './arabic/pack.js'
import { burmeseLanguagePack } from './burmese/pack.js'
//import { czechLanguagePack } from './czech/pack.js'
import { georgienLanguagePack } from './georgien/pack.js'
import { dhivehiLanguagePack } from './dhivehi/pack.js'
import { englishLanguagePack } from './english/pack.js'
import { hungarianLanguagePack } from './hungarian/pack.js'
import { persianLanguagePack } from './persian/pack.js'
import { turkishLanguagePack } from './turkish/pack.js'
import { hindiLanguagePack } from './hindi/pack.js'

const packs = {
  ar: arabicLanguagePack,
  //cz: czechLanguagePack,
  dv: dhivehiLanguagePack,
  en: englishLanguagePack,
  fa: persianLanguagePack,
  ge: georgienLanguagePack,
  hi: hindiLanguagePack,
  hu: hungarianLanguagePack,
  my: burmeseLanguagePack,
  tr: turkishLanguagePack
}

export const languagePacks: Map<string, LanguagePack> = new Map(
  Object.entries(packs)
)
