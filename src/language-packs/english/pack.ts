import type { LanguagePack } from '../../types.js'

export const englishLanguagePack: LanguagePack = {
  transliterations: {
    // English doesn't require transliterations
  },
  replacements: {
    '&': 'and', // Replace ampersand with 'and'
    '@': 'at', // Replace @ with 'at'
    '%': 'percent', // Replace % with 'percent'
    '©': 'c', // Replace copyright symbol with 'c'
    '®': 'r', // Replace registered trademark symbol with 'r'
    '™': 'tm', // Replace trademark symbol with 'tm'
    '∆': 'delta',
    '∞': 'infinity',
    '♥': 'love',
    '|': 'or',
    '<': 'less than',
    '>': 'greater than',
    '∑': 'sum',
    '¤': 'currency'
  },
  customRules: [
    // Example custom rule to handle double hyphens
    (text: string) => text.replace(/--+/g, '-'),
    // Example rule to trim dashes from the beginning or end of the slug
    (text: string) => text.replace(/(^-+)|(-+$)/g, '')
  ]
}
