import { SlugOptions } from '../get-slug.js'
import { titleCase } from './titleCase.js'
import { Transformer } from './transformer.js'
import { truncate } from './truncate.js'

export type Transformation = (input: string, opts: SlugOptions) => string

interface Transformations {
  [key: string]: Transformation
}

export const transformations: Transformations = {
  truncate,
  titleCase
}

export const applyTransformations = (
  input: string,
  config: SlugOptions
): string => {
  const transformer = new Transformer()

  Object.entries(config).forEach(
    ([transformationName, isConfiguredTransformation]) => {
      if (isConfiguredTransformation) {
        const transformation = transformations[transformationName]
        if (transformation) {
          transformer.addTransformation(transformation)
        } else {
          console.error(
            `Transformation "${transformationName}" does not exist.`
          )
        }
      }
    }
  )
  return transformer.transform(input, config)
}
