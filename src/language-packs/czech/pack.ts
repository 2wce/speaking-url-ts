import type { LanguagePack } from '../../types.js'
import { customRules } from '../custom-rules.js'

export const czechLanguagePack: LanguagePack = {
  transliterations: {
    č: 'c',
    ď: 'd',
    ě: 'e',
    ň: 'n',
    ř: 'r',
    š: 's',
    ť: 't',
    ů: 'u',
    ž: 'z',
    Č: 'C',
    Ď: 'D',
    Ě: 'E',
    Ň: 'N',
    Ř: 'R',
    Š: 'S',
    Ť: 'T',
    Ů: 'U',
    Ž: 'Z'
  },
  customRules: [...customRules]
}
