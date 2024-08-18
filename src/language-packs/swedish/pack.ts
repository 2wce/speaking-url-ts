import type { LanguagePack } from '../../types.js'
import { customRules } from '../custom-rules.js'

export const swedishLanguagePack: LanguagePack = {
  transliterations: {
    Ö: 'O',
    ö: 'o',
    Ä: 'A',
    ä: 'a',
    Å: 'A',
    å: 'a'
  },
  customRules: [...customRules]
}
