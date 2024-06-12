export declare const escapeChars: (input: string) => string;
/**
 * check if the char is an already converted char from custom list
 */
export declare const isReplacedCustomChar: (ch: string, customReplacements: Record<string, any>) => true | undefined;
