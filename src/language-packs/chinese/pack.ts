import type { LanguagePack } from '@/types.js'
import { customRules } from '../custom-rules.js'

export const chineseLanguagePack: LanguagePack = {
  transliterations: {
    你: 'ni',
    好: 'hao'
  },
  symbols: {
    '～': '~'
  },
  customRules: [...customRules]
}
