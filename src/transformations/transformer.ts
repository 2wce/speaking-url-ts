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
import { transformations } from './index.js'

type Transformation = (input: string, opts: SlugOptions) => string

const HAS_ONE_DIGIT = /^\d$/

const findWordInCustomObject = (word: string) =>
  new RegExp(`\\b${escapeChars(word)}\\b`, 'gi')

export class Transformer {
  private transformations: Set<Transformation> = new Set()

  private preProcess = (
    input: string,
    { custom = {}, titleCase, ...rest }: SlugOptions
  ) => {
    input = input.trim()

    // Convert custom config from Array to object format if necessary
    if (Array.isArray(custom)) {
      custom = custom.reduce<Record<string, string>>((acc, cur) => {
        acc[cur] = cur
        return acc
      }, {})
    }

    // Handle titleCase conversion if it's an array
    if (Array.isArray(titleCase)) {
      // Create a new object that is a copy of `custom`
      const customCopy = { ...custom }

      custom = titleCase.reduce<Record<string, string>>((acc, cur) => {
        acc[cur] = cur
        return acc
      }, customCopy)
      titleCase = true
    }

    if (typeof titleCase === 'object') {
      titleCase = true
    }

    // Perform custom replacements
    if (Object.keys(custom).length > 0) {
      Object.entries(custom).forEach(([word, replacement]) => {
        const regex =
          word.length > 1
            ? findWordInCustomObject(word)
            : HAS_ONE_DIGIT.test(word)
              ? new RegExp('') // Edge case for single digits
              : new RegExp(escapeChars(word), 'gi')

        input = input.replace(regex, replacement)
      })
    }

    return this.postProcess(input, { custom, titleCase, ...rest })
  }

  public addTransformation(transformation: Transformation): void {
    this.transformations.add(transformation)
  }

  public transform(input: string, opts: SlugOptions): string {
    const clonedConfig = { ...opts }

    const { input: processedInput, options: processedOptions } =
      this.preProcess(input, clonedConfig)

    // if there's a transformation in options that isn't in this.transformations add it first
    Object.keys(processedOptions).forEach((name) => {
      const isValidTransformation = transformations[name]
      if (typeof isValidTransformation === 'function') {
        this.addTransformation(transformations[name])
      }
    })

    return Array.from(this.transformations).reduce(
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
      maintainCase,
      titleCase,
      ...rest
    }: SlugOptions
  ) => {
    let lastCharWasSymbol = false
    let lastCharWasDiatric = false
    let diatricString = ''
    let result = ''
    let current = ''
    let allowedChars = ''

    if (custom && Object.keys(custom).length > 0) {
      // Add custom characters to allowed characters
      allowedChars += escapeChars(Object.values(custom).join(''))
    }

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

    // Escape special characters in the separator
    const escapedSeparator = escapeChars(separator as string)

    allowedChars += escapedSeparator

    // escape all necessary chars
    allowedChars = escapeChars(allowedChars)

    for (let i = 0, l = input.length; i < l; i++) {
      current = input[i]

      if (isReplacedCustomChar(current, custom as Record<string, string>)) {
        // don't convert a already converted char
        lastCharWasSymbol = false
      } else if (langChar[current]) {
        // process language specific diactrics chars conversion
        current =
          lastCharWasSymbol && langChar[current].match(/[A-Za-z0-9]/)
            ? ' ' + langChar[current]
            : langChar[current]
        lastCharWasSymbol = false
      } else if (current in CHARACTER_MAP) {
        // the transliteration changes entirely when some special characters are added
        if (i + 1 < l && LOOK_AHEAD_CHAR_ARRAY.indexOf(input[i + 1]) >= 0) {
          diatricString += current
          current = ''
        } else if (lastCharWasDiatric === true) {
          current = DIATRIC_MAP[diatricString] + CHARACTER_MAP[current]
          diatricString = ''
        } else {
          // process diactrics chars
          current =
            lastCharWasSymbol && CHARACTER_MAP[current].match(/[A-Za-z0-9]/)
              ? ' ' + CHARACTER_MAP[current]
              : CHARACTER_MAP[current]
        }
        lastCharWasSymbol = false
        lastCharWasDiatric = false
      } else if (current in DIATRIC_MAP) {
        diatricString += current
        current = ''
        // end of string, put the whole meaningful word
        if (i === l - 1) {
          current = DIATRIC_MAP[diatricString]
        }
        lastCharWasDiatric = true
      } else if (
        // process symbol chars
        symbol[current] &&
        !(uric && URIC_CHARACTERS.indexOf(current) !== -1) &&
        !(
          uricNoSlash &&
          URIC_NO_SLASH_CHARACTERS
            // .indexOf(ch) !== -1) && !(markFlag && markChars
            .indexOf(current) !== -1
        )
      ) {
        current =
          lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/)
            ? separator + symbol[current]
            : symbol[current]
        current +=
          input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/)
            ? separator
            : ''
        lastCharWasSymbol = true
      } else {
        if (lastCharWasDiatric === true) {
          current = DIATRIC_MAP[diatricString] + current
          diatricString = ''
          lastCharWasDiatric = false
        } else if (
          lastCharWasSymbol &&
          (/[A-Za-z0-9]/.test(current) || result.substr(-1).match(/A-Za-z0-9]/))
        ) {
          // process latin chars
          current = ' ' + current
        }
        lastCharWasSymbol = false
      }

      // add allowed chars
      result += current.replace(
        new RegExp('[^\\w\\s' + allowedChars + '_-]', 'g'),
        separator as string
      )
    }

    // Convert input to lowercase if case isn't configured
    if (!maintainCase && !titleCase) {
      result = result.toLowerCase()
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
        maintainCase,
        titleCase,
        ...rest
      }
    }
  }
}
