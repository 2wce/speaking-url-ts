import type { LanguagePack } from '../../types.js'

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
  customRules: [
    // Example custom rule to handle double hyphens
    (text: string) => text.replace(/--+/g, '-'),
    // Example rule to trim dashes from the beginning or end of the slug
    (text: string) => text.replace(/(^-+)|(-+$)/g, '')
  ]
}
