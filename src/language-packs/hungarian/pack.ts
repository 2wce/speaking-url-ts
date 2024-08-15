import type { LanguagePack } from '../../types.js'

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
  customRules: [
    // Example custom rule to handle double hyphens
    (text: string) => text.replace(/--+/g, '-'),
    // Example rule to trim dashes from the beginning or end of the slug
    (text: string) => text.replace(/(^-+)|(-+$)/g, '')
  ]
}
