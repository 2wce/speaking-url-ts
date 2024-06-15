import {
  CHARACTER_MAP,
  DIATRIC_MAP,
  LANGUAGE_CHARACTER_MAP,
  LOOK_AHEAD_CHAR_ARRAY,
  MARK_CHARACTERS,
  SYMBOL_MAP,
  URIC_CHARACTERS,
  URIC_NO_SLASH_CHARACTERS
} from '../dictionaries.js'
import { SlugOptions } from '../get-slug.js'
import { escapeChars, isReplacedCustomChar } from '../utils.js'
import { formatSeparators } from './default.js'

type Transformation = (input: string, opts: SlugOptions) => string

const HAS_ONE_DIGIT = /^\d$/

const findWordInCustomObject = (word: string) =>
  new RegExp(`\\b${escapeChars(word)}\\b`, 'gi')

export class Transformer {
  private transformations: Transformation[] = [formatSeparators]

  private preProcess = (
    input: string,
    { custom = {}, titleCase, maintainCase, ...rest }: SlugOptions
  ) => {
    input = input.trim()

    // Convert input to lowercase if case isn't configured
    if (!maintainCase && !titleCase) {
      input = input.toLowerCase()
    }

    // Convert custom config from Array to object format if necessary
    if (Array.isArray(custom)) {
      custom = custom.reduce<Record<string, string>>((acc, cur) => {
        acc[cur] = cur
        return acc
      }, {})
    }

    // Handle titleCase conversion if it's an array
    if (Array.isArray(titleCase)) {
      custom = titleCase.reduce<Record<string, string>>((acc, cur) => {
        acc[cur] = cur
        return acc
      }, custom)
      titleCase = true
    }

    // Perform custom replacements
    Object.entries(custom).forEach(([word, replacement]) => {
      const regex =
        word.length > 1
          ? findWordInCustomObject(word)
          : HAS_ONE_DIGIT.test(word)
            ? new RegExp('') // Edge case for single digits
            : new RegExp(escapeChars(word), 'gi')

      input = input.replace(regex, replacement)
    })

    return this.postProcess(input, { custom, titleCase, ...rest })
  }

  public addTransformation(transformation: Transformation): void {
    this.transformations.push(transformation)
  }

  public transform(input: string, opts: SlugOptions): string {
    const { input: processedInput, options: processedOptions } =
      this.preProcess(input, opts)

    return this.transformations.reduce(
      (acc, transformation) => transformation(acc, processedOptions),
      processedInput
    )
  }

  private postProcess = (
    input: string,
    {
      custom,
      lang,
      symbols,
      uric,
      uricNoSlash,
      separator,
      mark,
      ...rest
    }: SlugOptions
  ) => {
    let lastCharWasSymbol = false
    let lastCharWasDiatric = false
    let diatricString = ''
    let result = input
    let ch = ''
    let allowedChars = ''

    const convertSymbols = !(
      symbols === false ||
      (typeof lang === 'boolean' && lang === false)
    )

    const symbol =
      typeof lang === 'string' && SYMBOL_MAP[lang] && convertSymbols
        ? SYMBOL_MAP[lang]
        : convertSymbols
          ? SYMBOL_MAP.en
          : {}

    const langChar =
      typeof lang === 'string' && LANGUAGE_CHARACTER_MAP[lang]
        ? LANGUAGE_CHARACTER_MAP[lang]
        : typeof lang === 'boolean' && (lang === false || lang === true)
          ? {}
          : LANGUAGE_CHARACTER_MAP.en

    if (uric) {
      allowedChars += URIC_CHARACTERS
    }

    if (uricNoSlash) {
      allowedChars += URIC_NO_SLASH_CHARACTERS
    }

    if (mark) {
      allowedChars += MARK_CHARACTERS
    }

    allowedChars += separator

    // escape all necessary chars
    allowedChars = escapeChars(allowedChars)

    for (let i = 0, l = input.length; i < l; i++) {
      let current = input[i]
      if (isReplacedCustomChar(current, custom as Record<string, string>)) {
        // don't convert a already converted char
        lastCharWasSymbol = false
      } else if (langChar[current]) {
        // process language specific diactrics chars conversion
        ch =
          lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/)
            ? ' ' + langChar[ch]
            : langChar[ch]
        lastCharWasSymbol = false
      } else if (current in CHARACTER_MAP) {
        // the transliteration changes entirely when some special characters are added
        if (i + 1 < l && LOOK_AHEAD_CHAR_ARRAY.indexOf(input[i + 1]) >= 0) {
          diatricString += ch
          ch = ''
        } else if (lastCharWasDiatric === true) {
          ch = DIATRIC_MAP[diatricString] + CHARACTER_MAP[ch]
          diatricString = ''
        } else {
          // process diactrics chars
          ch =
            lastCharWasSymbol && CHARACTER_MAP[ch].match(/[A-Za-z0-9]/)
              ? ' ' + CHARACTER_MAP[ch]
              : CHARACTER_MAP[ch]
        }
        lastCharWasSymbol = false
        lastCharWasDiatric = false
      } else if (ch in DIATRIC_MAP) {
        diatricString += ch
        ch = ''
        // end of string, put the whole meaningful word
        if (i === l - 1) {
          ch = DIATRIC_MAP[diatricString]
        }
        lastCharWasDiatric = true
      } else if (
        // process symbol chars
        symbol[ch] &&
        !(uric && URIC_CHARACTERS.indexOf(ch) !== -1) &&
        !(
          uricNoSlash &&
          URIC_NO_SLASH_CHARACTERS
            // .indexOf(ch) !== -1) && !(markFlag && markChars
            .indexOf(ch) !== -1
        )
      ) {
        ch =
          lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/)
            ? separator + symbol[ch]
            : symbol[ch]
        ch +=
          input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/)
            ? separator
            : ''
        lastCharWasSymbol = true
      } else {
        if (lastCharWasDiatric === true) {
          ch = DIATRIC_MAP[diatricString] + ch
          diatricString = ''
          lastCharWasDiatric = false
        } else if (
          lastCharWasSymbol &&
          (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))
        ) {
          // process latin chars
          ch = ' ' + ch
        }
        lastCharWasSymbol = false
      }
      // add allowed chars
      result += ch.replace(
        new RegExp('[^\\w\\s' + allowedChars + '_-]', 'g'),
        separator as string
      )
    }

    return {
      input: result,
      options: {
        custom,
        lang,
        symbols,
        uric,
        uricNoSlash,
        separator,
        mark,
        ...rest
      }
    }
  }
}
