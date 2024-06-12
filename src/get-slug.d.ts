type Options = string | {
    lang?: string;
    maintainCase?: boolean;
    custom?: Record<string, any>;
    truncate?: number;
    uric?: boolean;
    uricNoSlash?: boolean;
    mark?: boolean;
    symbols?: boolean;
    separator?: string;
    titleCase?: any[] | boolean;
    onlyBase64?: boolean;
};
/**
 * getSlug
 * @param  {string} input input string
 * @param  {object|string} opts config object or separator string/char
 * @api    public
 * @return {string}  sluggified string
 */
export declare const getSlug: (input: string, opts?: Options) => string;
export {};
