# Instructions to Add a New Language Pack

## Create a New Language Pack File:

- Create a new directory, the name should be language name eg french.
- Create a new file named pack.ts in the new directory.

## Define the Transliteration Map:

- In the new file, export an object containing the transliterations.
Example for French (pack.ts):

```typescript
export const frenchLanguagePack: LanguagePack = {
  transliterations: {
    'é': 'e',
    'è': 'e',
    'ê': 'e',
    'à': 'a',
  },
  customRules: [...customRules]
}
```

## Add the Language Pack to the Main Packs File:

- Open src/language-packs/packs.ts.
- Import the new language pack and add it to the languagePacks object using it's locale code as the key.
- make sure the key is added in alphabetical order

```typescript
import { frenchLanguagePack } from './french/pack.js'

const packs = {
  ar: arabicLanguagePack,
  dk: danishLanguagePack,
  dv: dhivehiLanguagePack,
  en: englishLanguagePack,
  // french added here
  fr: frenchLanguagePack,
  ge: georgienLanguagePack,
}
```

## Add Test Cases:
- add language specific tests if you have phrases that you want to test
- otherwise `pack.test.ts` will test the new language pack along with everything else

By following these steps, you can add a new language pack to the project and ensure it works correctly with the existing transliteration system.