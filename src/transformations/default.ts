import { Transformation } from './index.js'

// Regular expression to find consecutive separators
const removeDuplicateSeparator = (separator: string) =>
  new RegExp(`${separator}{2,}`, 'g')

const findSeparator = (separator: string) => new RegExp(`\\${separator}+g`)

const trimSeparator = (separator: string) =>
  new RegExp(`(^\\${separator}+|\\${separator}+$)`, 'g')

export const formatSeparators: Transformation = (
  input,
  { separator = '-' }
) => {
  const formattedInput = input
    .replace(removeDuplicateSeparator(separator), separator)
    .replace(findSeparator(separator), separator)
    .replace(trimSeparator(separator), '')

  return formattedInput
}
