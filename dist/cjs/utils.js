"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axios = exports.Config = exports.API_VIDEO_ID = exports.API_POST_DETAIL = exports.API_POSTS = exports.API_POPULAR = exports.API_ONGOING = exports.API_SEARCH = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
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
const API_SEARCH = (query, lang) => `${BASE_URL}/api/get_search_results?search=${query}&count=100&lang=${isValidLang(lang)}&api_key=${APIKEY}`;
exports.API_SEARCH = API_SEARCH;
/** @p get_ongoing_index */
const API_ONGOING = (lang) => `${BASE_URL}/api/get_ongoing_index?page=1&count=40&lang=${isValidLang(lang)}&api_key=${APIKEY}`;
exports.API_ONGOING = API_ONGOING;
/** @p get_popular_index */
const API_POPULAR = (lang) => `${BASE_URL}/api/get_popular_index?page=1&count=40&lang=${isValidLang(lang)}&api_key=${APIKEY}`;
exports.API_POPULAR = API_POPULAR;
/** @p get_category_posts */
const API_POSTS = (id) => `${BASE_URL}/api/get_category_posts?id=${id}?page=1&count=40&api_key=${APIKEY}`;
exports.API_POSTS = API_POSTS;
/** @p get_post_detail_secure */
const API_POST_DETAIL = (id) => `${BASE_URL}/api/get_post_detail_secure?api_key=${APIKEY}&id=${id}`;
exports.API_POST_DETAIL = API_POST_DETAIL;
/** @p get_post_detail_video */
const API_VIDEO_ID = (id) => `${BASE_URL}/api/get_post_detail_video?api_key=${APIKEY}&video_id=${id}&page_id=4`;
exports.API_VIDEO_ID = API_VIDEO_ID;
exports.Config = {
    headers: {
        "Data-Agent": "The Stream",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/4.9.1",
    },
};
/* Make Keep-Alive Request */
exports.Axios = axios_1.default.create({
    httpsAgent: new https_1.default.Agent({ keepAlive: true }),
});
//# sourceMappingURL=utils.js.map