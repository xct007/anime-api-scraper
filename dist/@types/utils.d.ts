/**
 * @note {BASE_URL} or all endpoint bellow might be changed by the owner (?)
 */
/** @p get_search_results */
export declare const API_SEARCH: (query: string, lang: string) => string;
/** @p get_ongoing_index */
export declare const API_ONGOING: (lang: string) => string;
/** @p get_popular_index */
export declare const API_POPULAR: (lang: string) => string;
/** @p get_category_posts */
export declare const API_POSTS: (id: number | string) => string;
/** @p get_post_detail_secure */
export declare const API_POST_DETAIL: (id: number | string) => string;
/** @p get_post_detail_video */
export declare const API_VIDEO_ID: (id: number | string) => string;
export declare const Config: {
    headers: {
        "Data-Agent": string;
        "Accept-Encoding": string;
        "User-Agent": string;
    };
};
export declare const Axios: import("axios").AxiosInstance;
export interface Result {
    status: boolean;
    message?: string;
    count?: string | number;
    count_total?: number;
    pages?: string;
    categories?: {
        id?: number;
        category_name?: string;
        category_image?: string;
        category_update?: string;
        category_complete?: number;
        category_views?: number;
        category_ratings?: string;
        category_lang?: string;
        category_last?: string;
        category_order?: number;
        category_description?: string;
        category_ongoing_day?: number;
        category_count?: number;
    }[];
    category?: {
        id?: number;
        category_name?: string;
        category_image?: string;
        category_update?: string;
        category_complete?: number;
        category_views?: number;
        category_ratings?: string;
        category_lang?: string;
        category_last?: string | number;
        category_order?: number;
        category_description?: string;
    };
    genres?: {
        id?: number;
        genre_name?: string;
        pivot?: {
            movie_id?: number;
            genre_id?: number;
        }[];
    };
    posts?: {
        channel_id?: number;
        category_id?: number;
        channel_name?: string;
        channel_image?: string | null;
        channel_url?: string;
        channel_video_url?: {
            hd?: string | boolean;
            sd?: string | boolean;
        };
        channel_type?: string;
        video_id?: any;
        channel_description?: null;
        category_name?: string;
    }[];
    post?: {
        channel_id?: number;
        category_id?: number;
        channel_name?: string;
        channel_image?: null | string;
        channel_url?: string;
        channel_video_url?: {
            hd?: string | boolean;
            sd?: string | boolean;
        };
        channel_description?: string;
        channel_type?: string;
        channel_alt?: string;
        video_id?: string;
        fb_page_id?: number;
        category_name?: string;
        category_description?: string;
        category_image?: string;
        category_lang?: string;
        prev_channel?: {
            channel_id?: number;
            category_id?: number;
            channel_name?: string;
            channel_image?: null | string;
            channel_url?: string;
            channel_description?: null | string;
            channel_type?: string;
            channel_alt?: string;
            video_id?: string;
            fb_page_id?: number;
            category_name?: string;
            category_lang?: string;
        };
        channel_alt_list: string[];
        video_url: string;
    };
    suggested?: {
        id?: number;
        category_name?: string;
        category_image?: string;
        category_views?: number;
        category_ratings?: string;
        category_lang?: string;
        category_complete?: number;
        category_update?: string;
    }[];
}
//# sourceMappingURL=utils.d.ts.map