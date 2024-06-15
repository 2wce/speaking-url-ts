import { Transformation } from './index.js'

const REMOVE_DUPLICATE = /\s+/g

const findSeparator = (separator: string) => new RegExp(`\\${separator}+g`)

const trimSeparator = (separator: string) =>
  new RegExp(`(^\\${separator}+|\\${separator}+$)`, 'g')

export const formatSeparators: Transformation = (
  input,
  { separator = '-' }
) => {
  return input
    .replace(REMOVE_DUPLICATE, separator)
    .replace(findSeparator(separator), separator)
    .replace(trimSeparator(separator), '')
}
