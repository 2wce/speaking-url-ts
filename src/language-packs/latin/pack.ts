import type { LanguagePack } from '../../types.js'
import { customRules } from '../custom-rules.js'

export const latinLanguagePack: LanguagePack = {
  transliterations: {
    À: 'A',
    Á: 'A',
    Â: 'A',
    Ã: 'A',
    Ä: 'Ae',
    Å: 'A',
    Æ: 'AE',
    Ç: 'C',
    È: 'E',
    É: 'E',
    Ê: 'E',
    Ë: 'E',
    Ì: 'I',
    Í: 'I',
    Î: 'I',
    Ï: 'I',
    Ð: 'D',
    Ñ: 'N',
    Ò: 'O',
    Ó: 'O',
    Ô: 'O',
    Õ: 'O',
    Ö: 'Oe',
    Ő: 'O',
    Ø: 'O',
    Ù: 'U',
    Ú: 'U',
    Û: 'U',
    Ü: 'Ue',
    Ű: 'U',
    Ý: 'Y',
    Þ: 'TH',
    ß: 'ss',
    à: 'a',
    á: 'a',
    â: 'a',
    ã: 'a',
    ä: 'ae',
    å: 'a',
    æ: 'ae',
    ç: 'c',
    è: 'e',
    é: 'e',
    ê: 'e',
    ë: 'e',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    ð: 'd',
    ñ: 'n',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'oe',
    ő: 'o',
    ø: 'o',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'ue',
    ű: 'u',
    ý: 'y',
    þ: 'th',
    ÿ: 'y',
    ẞ: 'SS'
  },
  customRules: [...customRules]
}
