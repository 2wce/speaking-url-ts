import type { LanguagePack } from '@/types.js'
import { customRules } from '../custom-rules.js'

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
    '<': 'less-than',
    '>': 'greater-than',
    '∑': 'sum',
    '¤': 'currency'
  },
  customRules: [...customRules]
}
