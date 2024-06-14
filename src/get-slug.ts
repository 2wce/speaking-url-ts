import {
  character_map,
  diatric_map,
  language_character_map,
  look_ahead_char_array,
  mark_characters,
  symbol_map,
  uric_characters,
  uric_no_slash_characters
} from './dictionaries.js'
import { escapeChars, isReplacedCustomChar } from './utils.js'

export type SlugOptions = {
  // Specifies the language for symbol conversion. Defaults to 'en' (English).
  lang?: string | boolean
  // If true, maintains the original casing of the input string. Defaults to false.
  maintainCase?: boolean
  // An object of custom replacements where each key-value pair represents the character to be replaced and its replacement.
  custom?: Record<string, string> | string[]
  // A number indicating the maximum length of the resulting slug. The slug will be truncated to this length if specified.
  truncate?: number | boolean
  // If true, includes URI characters in the resulting slug.
  uric?: boolean
  // If true, includes URI characters except the slash ('/') in the resulting slug.
  uricNoSlash?: boolean
  // If true, includes URI fragment identifiers and query strings in the resulting slug.
  mark?: boolean
  // If false, disables symbol conversion. Defaults to true.
  symbols?: boolean
  // The character to use as a separator in the resulting slug. Defaults to '-'.
  separator?: string
  // If true or an array of strings, converts the slug to title case. If an array is provided, only the specified words are capitalized.
  titleCase?: string[] | boolean
  onlyBase64?: boolean
}

export type Options = string | SlugOptions

/**
 * Transforms a given input string into a slug, applying various transformations based on the provided options.
 *
 * @param {string} input The input string to be transformed into a slug.
 * @param {Options} [opts] Configuration options for slug generation
 * @return {string} The generated slug.
 */
export const getSlug = (input: string, opts?: Options) => {
  var separator = '-'
  var result = ''
  var diatricString = ''
  var convertSymbols = true
  var customReplacements = {} as Record<string, any>
  var maintainCase
  var titleCase
  var truncate
  var uricFlag
  var uricNoSlashFlag
  var markFlag
  var symbol
  var langChar
  var lucky
  var i
  var ch
  var l
  var lastCharWasSymbol
  var lastCharWasDiatric
  var allowedChars = ''

  if (typeof input !== 'string') {
    return ''
  }

  if (typeof opts === 'string') {
    separator = opts
  }

  symbol = symbol_map.en
  langChar = language_character_map.en

  if (typeof opts === 'object') {
    maintainCase = opts.maintainCase || false
    const customIsObject = typeof opts.custom === 'object'
    customReplacements =
      opts.custom && customIsObject ? opts.custom : customReplacements

    truncate =
      (typeof opts?.truncate === 'number' && opts.truncate > 1) || false
    uricFlag = opts.uric || false
    uricNoSlashFlag = opts.uricNoSlash || false
    markFlag = opts.mark || false
    convertSymbols = !(opts.symbols === false || opts.lang === 'false')
    separator = opts.separator ?? separator

    if (uricFlag) {
      allowedChars += uric_characters
    }

    if (uricNoSlashFlag) {
      allowedChars += uric_no_slash_characters
    }

    if (markFlag) {
      allowedChars += mark_characters
    }

    symbol =
      typeof opts.lang === 'string' && symbol_map[opts.lang] && convertSymbols
        ? symbol_map[opts.lang]
        : convertSymbols
          ? symbol_map.en
          : {}

    langChar =
      typeof opts.lang === 'string' && language_character_map[opts.lang]
        ? language_character_map[opts.lang]
        : opts.lang === 'false' || opts.lang === 'true'
          ? {}
          : language_character_map.en

    // if titleCase config is an Array, rewrite to object format
    if (
      Array.isArray(opts.titleCase) &&
      typeof opts.titleCase.length === 'number' &&
      Array.prototype.toString.call(opts.titleCase)
    ) {
      opts.titleCase.forEach(function (v) {
        customReplacements[v + ''] = v + ''
      })

      titleCase = true
    } else {
      titleCase = !!opts.titleCase
    }

    // if custom config is an Array, rewrite to object format
    if (Array.isArray(opts.custom)) {
      opts.custom.forEach(function (v: string) {
        customReplacements[v + ''] = v + ''
      })
    }

    // custom replacements
    Object.keys(customReplacements).forEach(function (v) {
      var r

      if (v.length > 1) {
        r = new RegExp('\\b' + escapeChars(v) + '\\b', 'gi')
      } else if (customIsObject && /^\d$/.test(v)) {
        r = ''
      } else {
        r = new RegExp(escapeChars(v), 'gi')
      }

      input = input.replace(r, customReplacements[v])
    })

    // add all custom replacement to allowed charlist
    for (ch in customReplacements) {
      allowedChars += ch
    }
  }

  allowedChars += separator

  // escape all necessary chars
  allowedChars = escapeChars(allowedChars)

  // trim whitespaces
  input = input.replace(/(^\s+|\s+$)/g, '')

  lastCharWasSymbol = false
  lastCharWasDiatric = false

  for (i = 0, l = input.length; i < l; i++) {
    ch = input[i]

    if (isReplacedCustomChar(ch, customReplacements)) {
      // don't convert a already converted char
      lastCharWasSymbol = false
    } else if (langChar[ch]) {
      // process language specific diactrics chars conversion
      ch =
        lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/)
          ? ' ' + langChar[ch]
          : langChar[ch]

      lastCharWasSymbol = false
    } else if (ch in character_map) {
      // the transliteration changes entirely when some special characters are added
      if (i + 1 < l && look_ahead_char_array.indexOf(input[i + 1]) >= 0) {
        diatricString += ch
        ch = ''
      } else if (lastCharWasDiatric === true) {
        ch = diatric_map[diatricString] + character_map[ch]
        diatricString = ''
      } else {
        // process diactrics chars
        ch =
          lastCharWasSymbol && character_map[ch].match(/[A-Za-z0-9]/)
            ? ' ' + character_map[ch]
            : character_map[ch]
      }

      lastCharWasSymbol = false
      lastCharWasDiatric = false
    } else if (ch in diatric_map) {
      diatricString += ch
      ch = ''
      // end of string, put the whole meaningful word
      if (i === l - 1) {
        ch = diatric_map[diatricString]
      }
      lastCharWasDiatric = true
    } else if (
      // process symbol chars
      symbol[ch] &&
      !(uricFlag && uric_characters.indexOf(ch) !== -1) &&
      !(
        uricNoSlashFlag &&
        uric_no_slash_characters
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
        ch = diatric_map[diatricString] + ch
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
      separator
    )
  }

  if (titleCase) {
    result = result.replace(/(\w)(\S*)/g, function (_, i, r) {
      var j = i.toUpperCase() + (r !== null ? r : '')
      return Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0
        ? j
        : j.toLowerCase()
    })
  }

  // eliminate duplicate separators
  // add separator
  // trim separators from start and end
  result = result
    .replace(/\s+/g, separator)
    .replace(new RegExp('\\' + separator + '+', 'g'), separator)
    .replace(
      new RegExp('(^\\' + separator + '+|\\' + separator + '+$)', 'g'),
      ''
    )

  //@ts-expect-error
  if (truncate && result.length > opts.truncate) {
    //@ts-expect-error
    lucky = result.charAt(opts.truncate) === separator
    //@ts-expect-error
    result = result.slice(0, opts.truncate)

    if (!lucky) {
      result = result.slice(0, result.lastIndexOf(separator))
    }
  }

  if (!maintainCase && !titleCase) {
    result = result.toLowerCase()
  }

  return result
}
