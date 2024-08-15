import type { LanguagePack } from '../../types.js'

export const englishLanguagePack: LanguagePack = {
  symbols: {
    '&': 'and',
    '@': 'at',
    '%': 'percent',
    '©': 'c',
    '®': 'r',
    '™': 'tm',
    '∆': 'delta',
    '∞': 'infinity',
    '♥': 'love',
    '|': 'or',
    '<': 'less than',
    '>': 'greater than',
    '∑': 'sum',
    '¤': 'currency',
  },
  customRules: [
    // Example custom rule to handle double hyphens
    (text: string) => text.replace(/--+/g, '-'),
    // Example rule to trim dashes from the beginning or end of the slug
    (text: string) => text.replace(/(^-+)|(-+$)/g, '')
  ]
}
