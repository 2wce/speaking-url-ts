import { LanguagePack } from '../types.js'
import { arabicLanguagePack } from './arabic/pack.js'
//import { burmeseLanguagePack } from './burmese/pack.js'
import { danishLanguagePack } from './danish/pack.js'
//import { czechLanguagePack } from './czech/pack.js'
import { dhivehiLanguagePack } from './dhivehi/pack.js'
import { englishLanguagePack } from './english/pack.js'
import { finnishLanguagePack } from './finnish/pack.js'
import { georgienLanguagePack } from './georgien/pack.js'
//import { hindiLanguagePack } from './hindi/pack.js'
import { hungarianLanguagePack } from './hungarian/pack.js'
import { persianLanguagePack } from './persian/pack.js'
import { swedishLanguagePack } from './swedish/pack.js'
import { turkishLanguagePack } from './turkish/pack.js'

const packs = {
  ar: arabicLanguagePack,
  //cz: czechLanguagePack,
  dk: danishLanguagePack,
  dv: dhivehiLanguagePack,
  en: englishLanguagePack,
  fa: persianLanguagePack,
  fi: finnishLanguagePack,
  ge: georgienLanguagePack,
  // hi: hindiLanguagePack,
  hu: hungarianLanguagePack,
  // my: burmeseLanguagePack,
  sv: swedishLanguagePack,
  tr: turkishLanguagePack
}

export const languagePacks: Map<string, LanguagePack> = new Map(
  Object.entries(packs)
)
