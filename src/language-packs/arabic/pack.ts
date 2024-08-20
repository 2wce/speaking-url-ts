import type { LanguagePack } from '@/types.js'
import { customRules } from '../custom-rules.js'

export const arabicLanguagePack: LanguagePack = {
  transliterations: {
    ا: 'a',
    أ: 'a',
    إ: 'i',
    آ: 'aa',
    ؤ: 'u',
    ئ: 'e',
    ء: 'a',
    ب: 'b',
    ت: 't',
    ث: 'th',
    ج: 'j',
    ح: 'h',
    خ: 'kh',
    د: 'd',
    ذ: 'th',
    ر: 'r',
    ز: 'z',
    س: 's',
    ش: 'sh',
    ص: 's',
    ض: 'dh',
    ط: 't',
    ظ: 'z',
    ع: 'a',
    غ: 'gh',
    ف: 'f',
    ق: 'q',
    ك: 'k',
    ل: 'l',
    م: 'm',
    ن: 'n',
    ه: 'h',
    و: 'w',
    ي: 'y',
    ى: 'a',
    ة: 'h',
    ﻻ: 'la',
    ﻷ: 'laa',
    ﻹ: 'lai',
    ﻵ: 'laa',

    // Arabic diactrics
    'َ': 'a',
    'ً': 'an',
    'ِ': 'e',
    'ٍ': 'en',
    'ُ': 'u',
    'ٌ': 'on',
    'ْ': '',

    // Arabic numbers
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9'
  },
  customRules: [...customRules]
}
