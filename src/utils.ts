import axios from "axios";
import https from "https";

const BASE_URL = "https://wibuid.com";
const APIKEY = "cda11bx8aITlKsXCpNB7y" + "VLnOdEGqg342ZFrQzJRetkSoUMi9w";

/** */
const isValidLang = (str: string): string => {
	let valid: string | boolean;
	if (
		(str && str.toLowerCase() == "id") ||
		str.toLowerCase() == "indo" ||
		str.toLowerCase() == "indonesia"
	) {
		valid = "id";
	} else if (
		(str && str.toLowerCase() == "en") ||
		str.toLowerCase() == "english" ||
		str.toLowerCase() == "inggris"
	) {
		valid = "gb";
	} else {
		valid = "id";
	}
	return valid;
};
/**
 * @note {BASE_URL} or all endpoint bellow might be changed by the owner (?)
 */
/** @p get_search_results */
export const API_SEARCH = (query: string, lang: string): string =>
	`${BASE_URL}/api/get_search_results?search=${query}&count=100&lang=${isValidLang(
		lang
	)}&api_key=${APIKEY}`;

/** @p get_ongoing_index */
export const API_ONGOING = (lang: string): string =>
	`${BASE_URL}/api/get_ongoing_index?page=1&count=40&lang=${isValidLang(
		lang
	)}&api_key=${APIKEY}`;

/** @p get_popular_index */
export const API_POPULAR = (lang: string): string =>
	`${BASE_URL}/api/get_popular_index?page=1&count=40&lang=${isValidLang(
		lang
	)}&api_key=${APIKEY}`;

/** @p get_category_posts */
export const API_POSTS = (id: number | string): string =>
	`${BASE_URL}/api/get_category_posts?id=${id}?page=1&count=40&api_key=${APIKEY}`;

/** @p get_post_detail_secure */
export const API_POST_DETAIL = (id: number | string): string =>
	`${BASE_URL}/api/get_post_detail_secure?api_key=${APIKEY}&id=${id}`;

/** @p get_post_detail_video */
export const API_VIDEO_ID = (id: number | string): string =>
	`${BASE_URL}/api/get_post_detail_video?api_key=${APIKEY}&video_id=${id}&page_id=4`;

export const Config = {
	headers: {
		"Data-Agent": "The Stream",
		"Accept-Encoding": "gzip",
		"User-Agent": "okhttp/4.9.1",
	},
};

/* Make Keep-Alive Request */
export const Axios = axios.create({
	httpsAgent: new https.Agent({ keepAlive: true }),
});

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
