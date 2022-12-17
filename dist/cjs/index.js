"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.search = exports.latest = void 0;
const string_similarity_1 = require("string-similarity");
const utils_1 = require("./utils");
async function latest(page, limit) {
    const URL = await (0, utils_1.API_LATEST)(page, limit);
    if (URL) {
        let count = 0;
        let result;
        while (true) {
            const _data = await (0, utils_1.FetchData)(`${URL}`);
            if (_data == "Oops, API Key is Incorrect!" || !_data.status) {
                if (count == 5) {
                    result = false;
                    break;
                }
                count = count + 1;
            }
            else if (_data.status) {
                result = {
                    retry_count: count,
                    ..._data,
                };
                break;
            }
        }
        return result;
    }
    else {
        return false;
    }
}
exports.latest = latest;
async function search(query) {
    const URL = await (0, utils_1.API_SEARCH)();
    if (URL) {
        let count = 0;
        let result;
        while (true) {
            const _data = await (0, utils_1.FetchData)(`${URL}`);
            if (_data == "Oops, API Key is Incorrect!" || !_data.status) {
                if (count == 5) {
                    result = false;
                    break;
                }
                count = count + 1;
            }
            else if (_data.status == "ok") {
                const arrData = _data.categories.filter((val) => {
                    return (0, string_similarity_1.compareTwoStrings)(String(val.category_name), query) > 0.3;
                });
                if (arrData) {
                    result = {
                        status: true,
                        retry_count: count,
                        result: arrData,
                    };
                }
                else {
                    result = {
                        status: false,
                        retry_count: count,
                        result: "Not Found",
                    };
                }
                break;
            }
        }
        return result;
    }
    else {
        return false;
    }
}
exports.search = search;
async function detail(id) {
    const URL = await (0, utils_1.API_VIDEOS)(id);
    if (URL) {
        let count = 0;
        let result;
        while (true) {
            const _data = await (0, utils_1.FetchData)(`${URL}`);
            if (_data == "Oops, API Key is Incorrect!" || !_data.status) {
                if (count == 5) {
                    result = false;
                    break;
                }
                count = count + 1;
            }
            else if (_data.status) {
                result = {
                    retry_count: count,
                    ..._data,
                };
                break;
            }
        }
        if (!result.posts.length) {
            count = 0;
            const _URL = await (0, utils_1.API_POST)(id);
            while (true) {
                const _data_ = await (0, utils_1.FetchData)(`${_URL}`);
                if (_data_ == "Oops, API Key is Incorrect!" || !_data_.status) {
                    if (count == 5) {
                        result = false;
                        break;
                    }
                    count = count + 1;
                }
                else if (_data_.status) {
                    result = {
                        retry_count: count,
                        ..._data_,
                    };
                    break;
                }
            }
        }
        else {
            result = false;
        }
        return result;
    }
    else {
        return false;
    }
}
exports.detail = detail;
//# sourceMappingURL=index.js.map