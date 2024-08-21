import type { LanguagePack } from '@/types.js'
import { customRules } from '../custom-rules.js'

export const danishLanguagePack: LanguagePack = {
  transliterations: {
    æ: 'ae',
    Æ: 'Ae',
    ø: 'oe',
    Ø: 'Oe',
    å: 'aa',
    Å: 'Aa'
  },
  customRules: [...customRules]
}
