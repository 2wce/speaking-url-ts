import {
  character_map,
  diatric_map,
  language_character_map,
  look_ahead_char_array,
  symbol_map,
  uric_characters,
  uric_no_slash_characters
} from './dictionaries'
import { SlugOptions } from './get-slug'

/**
 * Escapes special characters in a string for use in a regular expression.
 * @param input The string to escape.
 * @returns The escaped string.
 */
export const escapeChars = (input: string) => {
  return input.replace(/[-\\^$*+?.()|[\]{}/]/g, '\\$&')
}

/**
 * Checks if the character is an already converted character from a custom list.
 *
 * @param ch The character to check.
 * @param customReplacements A record of custom replacements where the key is the original character and the value is the replacement character.
 * @returns True if the character is a value in the customReplacements object, false otherwise.
 */
export const isReplacedCustomChar = (
  ch: string,
  customReplacements: Record<string, string>
) => {
  // Convert to Set for efficient lookup if this function is called multiple times
  // @TODO: Consider doing this conversion outside the function if customReplacements doesn't change
  return new Set(Object.keys(customReplacements)).has(ch)
}

export const defaultOptions: SlugOptions = {
  lang: 'en',
  separator: '-',
  maintainCase: false,
  titleCase: false,
  symbols: true,
  custom: {},
  mark: false,
  truncate: false,
  uric: false,
  uricNoSlash: false
}

export type ProcessCharacterOptions = {
  input: string
  opts: SlugOptions
  allowedChars: string
  separator: string
  titleCase: boolean
  customReplacements: Record<string, string>
  currentChar: string
}

export const processCharacters = ({
  input,
  opts,
  allowedChars,
  titleCase,
  separator,
  customReplacements,
  currentChar
}: ProcessCharacterOptions) => {
  const convertSymbols = !(opts.symbols === false || opts.lang === 'false')
  let lastCharWasSymbol
  let lastCharWasDiatric
  let diatricString = ''
  let result = ''

  const { uric: uricFlag, uricNoSlash: uricNoSlashFlag } = opts

  const symbol =
    typeof opts.lang === 'string' && symbol_map[opts.lang] && convertSymbols
      ? symbol_map[opts.lang]
      : convertSymbols
        ? symbol_map.en
        : {}

  const langChar =
    typeof opts.lang === 'string' && language_character_map[opts.lang]
      ? language_character_map[opts.lang]
      : opts.lang === false || opts.lang === true
        ? {}
        : language_character_map.en

  for (let i = 0, l = input.length; i < l; i++) {
    currentChar = input[i]

    if (isReplacedCustomChar(currentChar, customReplacements)) {
      // don't convert a already converted char
      lastCharWasSymbol = false
    } else if (langChar[currentChar]) {
      // process language specific diactrics chars conversion
      currentChar =
        lastCharWasSymbol && langChar[currentChar].match(/[A-Za-z0-9]/)
          ? ' ' + langChar[currentChar]
          : langChar[currentChar]

      lastCharWasSymbol = false
    } else if (currentChar in character_map) {
      // the transliteration changes entirely when some special characters are added
      if (i + 1 < l && look_ahead_char_array.indexOf(input[i + 1]) >= 0) {
        diatricString += currentChar
        currentChar = ''
      } else if (lastCharWasDiatric === true) {
        currentChar = diatric_map[diatricString] + character_map[currentChar]
        diatricString = ''
      } else {
        // process diactrics chars
        currentChar =
          lastCharWasSymbol && character_map[currentChar].match(/[A-Za-z0-9]/)
            ? ' ' + character_map[currentChar]
            : character_map[currentChar]
      }

      lastCharWasSymbol = false
      lastCharWasDiatric = false
    } else if (currentChar in diatric_map) {
      diatricString += currentChar
      currentChar = ''
      // end of string, put the whole meaningful word
      if (i === l - 1) {
        currentChar = diatric_map[diatricString]
      }
      lastCharWasDiatric = true
    } else if (
      // process symbol chars
      symbol[currentChar] &&
      !(uricFlag && uric_characters.indexOf(currentChar) !== -1) &&
      !(
        uricNoSlashFlag &&
        uric_no_slash_characters
          // .indexOf(ch) !== -1) && !(markFlag && markChars
          .indexOf(currentChar) !== -1
      )
    ) {
      currentChar =
        lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/)
          ? separator + symbol[currentChar]
          : symbol[currentChar]
      currentChar +=
        input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/)
          ? separator
          : ''

      lastCharWasSymbol = true
    } else {
      if (lastCharWasDiatric === true) {
        currentChar = diatric_map[diatricString] + currentChar
        diatricString = ''
        lastCharWasDiatric = false
      } else if (
        lastCharWasSymbol &&
        (/[A-Za-z0-9]/.test(currentChar) ||
          result.substr(-1).match(/A-Za-z0-9]/))
      ) {
        // process latin chars
        currentChar = ' ' + currentChar
      }
      lastCharWasSymbol = false
    }

    // add allowed chars
    result += currentChar.replace(
      new RegExp('[^\\w\\s' + allowedChars + '_-]', 'g'),
      separator
    )
  }

  if (titleCase) {
    console.log('-----------------titleCase-----------------', {
      result,
      customReplacements
    })
    result = toTitleCaseWithCustomReplacements(result, customReplacements)
  }

  return result
}

// Utility function extracted
export const toTitleCaseWithCustomReplacements = (
  inputString: string,
  customReplacements: { [key: string]: string }
): string => {
  return inputString.replace(
    /(\w)(\S*)/g,
    function (_, firstChar, restOfString) {
      var titleCased =
        firstChar.toUpperCase() +
        (restOfString !== null ? restOfString.toLowerCase() : '') // Ensure the rest of the string is in lowercase
      var key = titleCased.toLowerCase() // Use the lowercase version to check in customReplacements
      if (Object.keys(customReplacements).indexOf(key) >= 0) {
        return customReplacements[key] // Use the custom replacement if available
      } else {
        return titleCased // Keep the title-cased version otherwise
      }
    }
  )
}
