import type { LanguagePack } from '@/types.js'
import { customRules } from '../custom-rules.js'

export const finnishLanguagePack: LanguagePack = {
  transliterations: {
    Ö: 'O',
    ö: 'o',
    Ä: 'A',
    ä: 'a'
  },
  customRules: [...customRules]
}
