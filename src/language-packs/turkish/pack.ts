import type { LanguagePack } from '../../types.js'
import { customRules } from '../custom-rules.js'

export const turkishLanguagePack: LanguagePack = {
  transliterations: {
    Ä: 'Ae',
    ä: 'ae',
    ş: 's',
    Ş: 'S',
    ı: 'i',
    İ: 'I',
    ç: 'c',
    Ç: 'C',
    ü: 'u',
    Ü: 'U',
    ö: 'o',
    Ö: 'O',
    ğ: 'g',
    Ğ: 'G'
  },
  customRules: [...customRules]
}
