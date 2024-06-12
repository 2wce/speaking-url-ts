export const escapeChars = (input: string) => {
  return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, '\\$&')
}

/**
 * check if the char is an already converted char from custom list
 */
export const isReplacedCustomChar = (
  ch: string,
  customReplacements: Record<string, any>
) => {
  for (var c in customReplacements) {
    if (customReplacements[c] === ch) {
      return true
    }
  }
}
