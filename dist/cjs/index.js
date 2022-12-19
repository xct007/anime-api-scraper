"use strict";
/**
 * @author FrierenDv
 * @version 1.0.0
 * @warning this module originally sending request to @link {./utils}
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.popular = exports.ongoing = exports.search = void 0;
const utils_1 = require("./utils.js");
/**
 * Get data anime by query
 * @param {String} query
 * @param {String} lang (optional), default "id"
 * @returns {Promise<Object>}
 */
const search = async (query, lang) => {
    let result;
    if (!lang) {
        lang = "id";
    }
    const data = await utils_1.Axios.get((0, utils_1.API_SEARCH)(query, lang), {
        ...utils_1.Config,
    }).catch((e) => {
        return e.response;
    });
    if (data.data.status && data.data.categories.length) {
        delete data.data.status;
        result = {
            status: true,
            ...data.data,
        };
    }
    else {
        result = {
            status: false,
            message: "Error Not found",
        };
    }
    return result;
};
exports.search = search;
/**
 * Get current on going anime.
 * @param {String} lang (optional), default "id"
 * @returns {Promise<Object>}
 */
const ongoing = async (lang) => {
    let result;
    if (!lang) {
        lang = "id";
    }
    const data = await utils_1.Axios.get((0, utils_1.API_ONGOING)(lang), {
        ...utils_1.Config,
    }).catch((e) => {
        return e.response;
    });
    if (data.data && data.data.categories.length) {
        delete data.data["status"];
        result = {
            status: true,
            ...data.data,
        };
    }
    else {
        result = {
            status: false,
            message: "Failed to fetch data from {API_ONGOING}",
        };
    }
    return result;
};
exports.ongoing = ongoing;
/**
 * Get popular anime.
 * @param {String} lang (optional), default "id"
 * @returns {Promise<Object>}
 */
const popular = async (lang) => {
    let result;
    if (!lang) {
        lang = "id";
    }
    const data = await utils_1.Axios.get((0, utils_1.API_POPULAR)(lang), {
        ...utils_1.Config,
    }).catch((e) => {
        return e.response;
    });
    if (data.data && data.data.categories.length) {
        delete data.data["status"];
        result = {
            status: true,
            ...data.data,
        };
    }
    else {
        result = {
            status: false,
            message: "Failed to fetch data from {API_POPULAR}",
        };
    }
    return result;
};
exports.popular = popular;
/**
 * Get post detail by channel_id or category_id/id
 * @param {Number|String} id
 * @returns {Promise<Object>}
 * TODO: Make code more readble
 */
const detail = async (id) => {
    let result;
    let data = await utils_1.Axios.get((0, utils_1.API_POSTS)(id), {
        ...utils_1.Config,
    }).catch((e) => {
        return e.response;
    });
    if (data.data.status && data.data.posts.length) {
        let postTemp = [];
        for (const i of data.data.posts) {
            i["video_id"] = i["video_id"].split(", ");
            const [a, b] = i["video_id"];
            i["channel_video_url"] = i["channel_video_url"]
                ? i["channel_video_url"]
                : {};
            if (a) {
                const _a = await utils_1.Axios.get((0, utils_1.API_VIDEO_ID)(a), {
                    ...utils_1.Config,
                }).catch((e) => {
                    return e;
                });
                if (_a.data.status && _a.data.url.length) {
                    Object.assign(i["channel_video_url"], {
                        hd: _a.data.url,
                    });
                }
            }
            if (b) {
                const _b = await utils_1.Axios.get((0, utils_1.API_VIDEO_ID)(b), {
                    ...utils_1.Config,
                }).catch((e) => {
                    return e;
                });
                if (_b.data.status && _b.data.url.length) {
                    Object.assign(i["channel_video_url"], {
                        sd: _b.data.url,
                    });
                }
            }
            delete i["video_id"];
            postTemp.push(i);
        }
        delete data.data.status;
        delete data.data.posts;
        result = {
            status: true,
            ...data.data,
            posts: postTemp,
        };
    }
    else {
        data = await utils_1.Axios.get((0, utils_1.API_POST_DETAIL)(id), {
            ...utils_1.Config,
        }).catch((e) => {
            return e.response;
        });
        if (data.data.status && data.data.post) {
            data.data.post["video_id"] = data.data.post["video_id"].split(", ");
            const [a, b] = data.data.post["video_id"];
            data.data.post["channel_video_url"] = data.data.post["channel_video_url"]
                ? data.data.post["channel_video_url"]
                : {};
            if (a) {
                const _a = await utils_1.Axios.get((0, utils_1.API_VIDEO_ID)(a), {
                    ...utils_1.Config,
                }).catch((e) => {
                    return e;
                });
                if (_a.data.status && _a.data.url.length) {
                    Object.assign(data.data.post["channel_video_url"], {
                        hd: _a.data.url,
                    });
                }
            }
            if (b) {
                const _b = await utils_1.Axios.get((0, utils_1.API_VIDEO_ID)(b), {
                    ...utils_1.Config,
                }).catch((e) => {
                    return e;
                });
                if (_b.data.status && _b.data.url.length) {
                    Object.assign(data.data.post["channel_video_url"], {
                        sd: _b.data.url,
                    });
                }
            }
            delete data.data["status"];
            delete data.data.post["video_id"];
            delete data.data["suggested"];
            delete data.data.post["channel_alt"];
            delete data.data.post["channel_alt_list"];
            delete data.data.post["prev_channel"];
            result = {
                status: true,
                ...data.data,
            };
        }
        else {
            result = {
                status: false,
                message: "Maybe wrong id or idk",
            };
        }
    }
    return result;
};
exports.detail = detail;
const inunime = {
    latest: exports.ongoing,
    ongoing: exports.ongoing,
    search: exports.search,
    detail: exports.detail,
};
exports.default = inunime;
/** @endcode */
//# sourceMappingURL=index.js.map
