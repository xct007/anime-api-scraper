/**
 * @author FrierenDv
 * @version 1.0.0
 * @warning this module originally sending request to @link {./utils}
 */

import {
	Axios,
	Config,
	Result,
	API_SEARCH,
	API_ONGOING,
	API_POPULAR,
	API_POSTS,
	API_POST_DETAIL,
	API_VIDEO_ID,
} from "./utils";

/**
 * Get data anime by query
 * @param {String} query
 * @param {String} lang (optional), default "id"
 * @returns {Promise<Object>}
 */
export const search = async (query: string, lang?: string): Promise<object> => {
	let result: Result;
	if (!lang) {
		lang = "id";
	}
	const data = await Axios.get(API_SEARCH(query, lang), {
		...Config,
	}).catch((e: any) => {
		return e.response;
	});
	if (data.data.status && data.data.categories.length) {
		delete data.data.status;
		result = {
			status: true,
			...data.data,
		};
	} else {
		result = {
			status: false,
			message: "Error Not found",
		};
	}
	return result;
};

/**
 * Get current on going anime.
 * @param {String} lang (optional), default "id"
 * @returns {Promise<Object>}
 */
export const ongoing = async (lang?: string): Promise<object> => {
	let result: Result;
	if (!lang) {
		lang = "id";
	}
	const data = await Axios.get(API_ONGOING(lang), {
		...Config,
	}).catch((e: any) => {
		return e.response;
	});
	if (data.data && data.data.categories.length) {
		delete data.data["status"];
		result = {
			status: true,
			...data.data,
		};
	} else {
		result = {
			status: false,
			message: "Failed to fetch data from {API_ONGOING}",
		};
	}
	return result;
};

/**
 * Get popular anime.
 * @param {String} lang (optional), default "id"
 * @returns {Promise<Object>}
 */
export const popular = async (lang?: string): Promise<object> => {
	let result: Result;
	if (!lang) {
		lang = "id";
	}
	const data = await Axios.get(API_POPULAR(lang), {
		...Config,
	}).catch((e: any) => {
		return e.response;
	});
	if (data.data && data.data.categories.length) {
		delete data.data["status"];
		result = {
			status: true,
			...data.data,
		};
	} else {
		result = {
			status: false,
			message: "Failed to fetch data from {API_POPULAR}",
		};
	}
	return result;
};

/**
 * Get post detail by channel_id or category_id/id
 * @param {Number|String} id
 * @returns {Promise<Object>}
 * TODO: Make code more readble
 */
export const detail = async (id: number | string): Promise<object> => {
	let result: Result;
	let data: any = await Axios.get(API_POSTS(id), {
		...Config,
	}).catch((e: any) => {
		return e.response;
	});
	if (data.data.status && data.data.posts.length) {
		let postTemp: Result["posts"] = [];
		for (const i of data.data.posts) {
			i["video_id"] = i["video_id"].split(", ");
			const [a, b] = i["video_id"];
			i["channel_video_url"] = i["channel_video_url"]
				? i["channel_video_url"]
				: {};
			if (a) {
				const _a = await Axios.get(API_VIDEO_ID(a), {
					...Config,
				}).catch((e: any) => {
					return e;
				});
				if (_a.data.status && _a.data.url.length) {
					Object.assign(i["channel_video_url"], {
						hd: _a.data.url,
					});
				}
			}
			if (b) {
				const _b = await Axios.get(API_VIDEO_ID(b), {
					...Config,
				}).catch((e: any) => {
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
	} else {
		data = await Axios.get(API_POST_DETAIL(id), {
			...Config,
		}).catch((e: any) => {
			return e.response;
		});
		if (data.data.status && data.data.post) {
			data.data.post["video_id"] = data.data.post["video_id"].split(", ");
			const [a, b] = data.data.post["video_id"];
			data.data.post["channel_video_url"] = data.data.post["channel_video_url"]
				? data.data.post["channel_video_url"]
				: {};
			if (a) {
				const _a = await Axios.get(API_VIDEO_ID(a), {
					...Config,
				}).catch((e: any) => {
					return e;
				});
				if (_a.data.status && _a.data.url.length) {
					Object.assign(data.data.post["channel_video_url"], {
						hd: _a.data.url,
					});
				}
			}
			if (b) {
				const _b = await Axios.get(API_VIDEO_ID(b), {
					...Config,
				}).catch((e: any) => {
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
		} else {
			result = {
				status: false,
				message: "Maybe wrong id or idk",
			};
		}
	}
	return result;
};
const inunime = {
	latest: ongoing,
	ongoing,
	search,
	detail,
};
export default inunime;
/** @endcode */
