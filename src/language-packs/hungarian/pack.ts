import type { LanguagePack } from '@/types.js'
import { customRules } from '../custom-rules.js'

export const hungarianLanguagePack: LanguagePack = {
  transliterations: {
    É: 'E',
    é: 'e',
    ó: 'o',
    í: 'i',
    ú: 'u',
    Í: 'I',
    Ó: 'O',
    Ú: 'U',
    Ü: 'U',
    ä: 'a',
    Ä: 'A',
    á: 'a',
    Á: 'A',
    ö: 'o',
    Ö: 'O',
    ő: 'o',
    Ő: 'O',
    ü: 'u',
    ű: 'u',
    Ű: 'U'
  },
  customRules: [...customRules]
}
