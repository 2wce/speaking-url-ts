import type { LanguagePack } from '../../types.js'
import { customRules } from '../custom-rules.js'

export const persianLanguagePack: LanguagePack = {
  transliterations: {
    // Persian numbers
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',

    // Persian additional characters than Arabic
    گ: 'g',
    چ: 'ch',
    پ: 'p',
    ژ: 'zh',
    ک: 'k',
    ی: 'y'
  },
  customRules: [...customRules]
}
