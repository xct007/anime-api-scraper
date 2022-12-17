import axios from "axios";
import { compareTwoStrings } from "string-similarity";

import {
	API_LATEST,
	API_SEARCH,
	API_VIDEOS,
	API_POST,
	FetchData,
} from "./utils";

async function latest(page: number, limit: number): Promise<object | boolean> {
	const URL = await API_LATEST(page, limit);
	if (URL) {
		let count: number = 0;
		let result: any;
		while (true) {
			const _data = await FetchData(`${URL}`);
			if (_data == "Oops, API Key is Incorrect!" || !_data.status) {
				if (count == 5) {
					result = false;
					break;
				}
				count = count + 1;
			} else if (_data.status) {
				result = {
					retry_count: count,
					..._data,
				};
				break;
			}
		}
		return result;
	} else {
		return false;
	}
}
type searchResponse = {
	status: boolean;
	retry_count: number;
	result?: any[] | string;
};
async function search(query: string): Promise<searchResponse | boolean> {
	const URL = await API_SEARCH();
	if (URL) {
		let count: number = 0;
		let result: any;
		while (true) {
			const _data = await FetchData(`${URL}`);
			if (_data == "Oops, API Key is Incorrect!" || !_data.status) {
				if (count == 5) {
					result = false;
					break;
				}
				count = count + 1;
			} else if (_data.status == "ok") {
				const arrData = _data.categories.filter((val: any) => {
					return compareTwoStrings(String(val.category_name), query) > 0.3;
				});
				if (arrData) {
					result = {
						status: true,
						retry_count: count,
						result: arrData,
					};
				} else {
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
	} else {
		return false;
	}
}
async function detail(id: number): Promise<object | boolean> {
	const URL = await API_VIDEOS(id);
	if (URL) {
		let count: number = 0;
		let result: any;
		while (true) {
			const _data = await FetchData(`${URL}`);
			if (_data == "Oops, API Key is Incorrect!" || !_data.status) {
				if (count == 5) {
					result = false;
					break;
				}
				count = count + 1;
			} else if (_data.status) {
				result = {
					retry_count: count,
					..._data,
				};
				break;
			}
		}
		if (!result.posts.length) {
			count = 0;
			const _URL = await API_POST(id);
			while (true) {
				const _data_ = await FetchData(`${_URL}`);
				if (_data_ == "Oops, API Key is Incorrect!" || !_data_.status) {
					if (count == 5) {
						result = false;
						break;
					}
					count = count + 1;
				} else if (_data_.status) {
					result = {
						retry_count: count,
						..._data_,
					};
					break;
				}
			}
		} else {
			result = false;
		}
		return result;
	} else {
		return false;
	}
}
export { latest, search, detail };
