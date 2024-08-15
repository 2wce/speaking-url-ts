import type { LanguagePack } from '../../types.js'

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
  customRules: [
    // Example custom rule to handle double hyphens
    (text: string) => text.replace(/--+/g, '-'),
    // Example rule to trim dashes from the beginning or end of the slug
    (text: string) => text.replace(/(^-+)|(-+$)/g, '')
  ]
}
