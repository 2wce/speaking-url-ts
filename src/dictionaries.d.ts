/**
 * charMap
 */
export declare const character_map: Record<string, string>;
/**
 * special look ahead character array
 * These characters form with consonants to become 'single'/consonant combo
 */
export declare const look_ahead_char_array: string[];
/**
 * diatricMap for languages where transliteration changes entirely as more diatrics are added
 */
export declare const diatric_map: Record<string, string>;
/**
 * langCharMap language specific characters translations
 */
export declare const language_character_map: Record<string, Record<string, string>>;
/**
 * symbolMap language specific symbol translations
 * translations must be transliterated already
 */
export declare const symbol_map: Record<string, Record<string, string>>;
export declare const uric_characters: string;
export declare const uric_no_slash_characters: string;
export declare const mark_characters: string;
