import { Transformation } from './index.js'

export const truncate: Transformation = (input, { truncate, separator }) => {
  console.log('truncate', { input, truncate, separator })
  if (separator && typeof truncate === 'number' && input.length > truncate) {
    const lucky = input.charAt(truncate) === separator

    input = input.slice(0, truncate)

    if (!lucky) {
      input = input.slice(0, input.lastIndexOf(separator))
    }
  }

  return input
}
