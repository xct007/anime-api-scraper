import axios from "axios";
import https from "https";
const BASE_URL = "https://wibuid.com";
const APIKEY = "cda11bx8aITlKsXCpNB7y" + "VLnOdEGqg342ZFrQzJRetkSoUMi9w";
/** */
const isValidLang = (str) => {
    let valid;
    if ((str && str.toLowerCase() == "id") ||
        str.toLowerCase() == "indo" ||
        str.toLowerCase() == "indonesia") {
        valid = "id";
    }
    else if ((str && str.toLowerCase() == "en") ||
        str.toLowerCase() == "english" ||
        str.toLowerCase() == "inggris") {
        valid = "gb";
    }
    else {
        valid = "id";
    }
    return valid;
};
/**
 * @note {BASE_URL} or all endpoint bellow might be changed by the owner (?)
 */
/** @p get_search_results */
export const API_SEARCH = (query, lang) => `${BASE_URL}/api/get_search_results?search=${query}&count=100&lang=${isValidLang(lang)}&api_key=${APIKEY}`;
/** @p get_ongoing_index */
export const API_ONGOING = (lang) => `${BASE_URL}/api/get_ongoing_index?page=1&count=40&lang=${isValidLang(lang)}&api_key=${APIKEY}`;
/** @p get_popular_index */
export const API_POPULAR = (lang) => `${BASE_URL}/api/get_popular_index?page=1&count=40&lang=${isValidLang(lang)}&api_key=${APIKEY}`;
/** @p get_category_posts */
export const API_POSTS = (id) => `${BASE_URL}/api/get_category_posts?id=${id}?page=1&count=40&api_key=${APIKEY}`;
/** @p get_post_detail_secure */
export const API_POST_DETAIL = (id) => `${BASE_URL}/api/get_post_detail_secure?api_key=${APIKEY}&id=${id}`;
/** @p get_post_detail_video */
export const API_VIDEO_ID = (id) => `${BASE_URL}/api/get_post_detail_video?api_key=${APIKEY}&video_id=${id}&page_id=4`;
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
//# sourceMappingURL=utils.js.map