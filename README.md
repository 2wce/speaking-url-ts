# **speaking-url-ts**

[![Version](https://img.shields.io/npm/v/speaking-url-ts.svg)](https://www.npmjs.com/package/speaking-url-ts)
[![License](https://img.shields.io/npm/l/speaking-url-ts.svg)](https://github.com/2wce/speaking-url-ts/blob/main/LICENSE)
![Build Status](https://github.com/2wce/speaking-url-ts/actions/workflows/release.yml/badge.svg)

**speaking-url-ts** is a flexible, language-agnostic library that generates readable, SEO-friendly slugs for any language. It supports custom transliterations and symbol replacements to create clean, URL-safe slugs.

## **Features**
- Supports multiple languages with custom language packs.
- Handles transliterations from non-Latin scripts (e.g., Cyrillic, Arabic).
- Applies custom replacements.
- Flexible configuration with custom rules for slug formatting.

## **Installation**

You can install the `speaking-url-ts` library using npm:

```bash
npm install speaking-url-ts
```

## **Usage**

### **Basic Usage**

To generate a slug, first import the library and then use the `generateSlug` function:

```typescript
import { generateSlug, addLanguagePack } from 'speaking-url-ts';

// Use the default English language pack
const slug = generateSlug('Hello, World!', { locale: 'en' });
console.log(slug);  // Output: "hello-world"
```

### **Adding a Custom Language Pack**

You can add a custom language pack to handle specific transliterations, symbol replacements and custom rules for your desired language.

Here’s how to create and add a custom language pack:

1. **Define Your Language Pack**

```javascript
const { LanguagePack } = require('speaking-url-ts');

const customLanguagePack = {
    transliterations: {
        '你好': 'nihao',    // Example: Chinese characters to Pinyin
        'мир': 'mir',       // Example: Russian to Latin
    },
    symbols: {
        '&': 'and',
        '@': 'at',
        '%': 'percent',
    },
    customRules: [
        (text) => text.replace(/м/g, 'm'), // Example: Replace all 'м' with 'm'
        (text) => text.trim(), // Trim spaces
    ]
};
```

2. **Add the Language Pack**

```javascript
addLanguagePack('custom', customLanguagePack);
```

3. **Generate a Slug Using the Custom Language Pack**

```javascript
const slug = generateSlug('Привет, мир!', { locale: 'custom' });
console.log(slug);  // Output: "privet-mir"
```

### **Complete Example**

```typescript
import { generateSlug, addLanguagePack } from 'speaking-url-ts';

// Define and add the custom language pack
const russianLanguagePack = {
    transliterations: {
        'Привет': 'Privet',
        'мир': 'mir',
        'й': 'i',
    },
    symbols: {
        '&': 'i',
        ',': '',
    },
    customRules: [
        text => text.replace(/м/g, 'm'), // Custom rule to replace 'м' with 'm'
    ]
};

addLanguagePack('ru', russianLanguagePack);

// Generate a slug
const slug = generateSlug('Привет, мир и Москва', { locale: 'ru' });
console.log(slug);  // Output: "privet-mir-i-moskva"
```

## **API Reference**

### **`generateSlug(input: string, options: { locale: string, separator?: string }): string`**

Generates a slug from the input string.

- **`input`**: The text to be converted into a slug.
- **`options`**:
  - **`locale`**: The language pack to use (e.g., `'en'` for English).
  - **`separator`**: (Optional) The character used to separate words in the slug. Defaults to `'-'`.

### **`addLanguagePack(locale: string, pack: LanguagePack): void`**

Adds a new language pack or updates an existing one.

- **`locale`**: The locale identifier (e.g., `'ru'` for Russian).
- **`pack`**: The language pack object containing transliterations, replacements, stop words, and custom rules.

## **Language Pack Structure**

A language pack is an object with the following optional fields:

- **`transliterations`**: An object mapping characters or phrases to their transliterated equivalents.
- **`symbols`**: An object mapping characters to replace.
- **`customRules`**: An array of functions that apply custom transformations to the text.

### **Example Language Pack**

```typescript
interface LanguagePack {
    transliterations?: { [key: string]: string };
    symbols?: { [key: string]: string };
    customRules?: Array<(text: string) => string>;
}
```

### **Contributing**

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your improvements or new language packs.

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
