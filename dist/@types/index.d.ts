/**
 * @author FrierenDv
 * @version 1.0.0
 * @warning this module originally sending request to @link {./utils}
 */
/**
 * Get data anime by query
 * @param {String} query
 * @param {String} lang (optional), default "id"
 * @returns {Promise<Object>}
 */
export declare const search: (query: string, lang?: string) => Promise<object>;
/**
 * Get current on going anime.
 * @param {String} lang (optional), default "id"
 * @returns {Promise<Object>}
 */
export declare const ongoing: (lang?: string) => Promise<object>;
/**
 * Get popular anime.
 * @param {String} lang (optional), default "id"
 * @returns {Promise<Object>}
 */
export declare const popular: (lang?: string) => Promise<object>;
/**
 * Get post detail by channel_id or category_id/id
 * @param {Number|String} id
 * @returns {Promise<Object>}
 * TODO: Make code more readble
 */
export declare const detail: (id: number | string) => Promise<object>;
declare const inunime: {
    latest: (lang?: string) => Promise<object>;
    ongoing: (lang?: string) => Promise<object>;
    search: (query: string, lang?: string) => Promise<object>;
    detail: (id: number | string) => Promise<object>;
};
export default inunime;
/** @endcode */
//# sourceMappingURL=index.d.ts.map