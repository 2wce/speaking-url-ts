import type { LanguagePack } from '@/types.js'
import { customRules } from '../custom-rules.js'

export const georgienLanguagePack: LanguagePack = {
  transliterations: {
    ა: 'a',
    ბ: 'b',
    გ: 'g',
    დ: 'd',
    ე: 'e',
    ვ: 'v',
    ზ: 'z',
    თ: 't',
    ი: 'i',
    კ: 'k',
    ლ: 'l',
    მ: 'm',
    ნ: 'n',
    ო: 'o',
    პ: 'p',
    ჟ: 'zh',
    რ: 'r',
    ს: 's',
    ტ: 't',
    უ: 'u',
    ფ: 'p',
    ქ: 'k',
    ღ: 'gh',
    ყ: 'q',
    შ: 'sh',
    ჩ: 'ch',
    ც: 'ts',
    ძ: 'dz',
    წ: 'ts',
    ჭ: 'ch',
    ხ: 'kh',
    ჯ: 'j',
    ჰ: 'h'
  },
  customRules: [...customRules]
}
