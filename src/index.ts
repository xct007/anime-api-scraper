import axios from 'axios';
import { API_LATEST, API_SEARCH, FetchData } from './utils';

async function latest(page: number, limit: number,): Promise<object|string|boolean> {
    const URL = await API_LATEST(page, limit);
    if (URL) {
        let count: number = 0;
        let result: any
        while (true) {
            const _data = await FetchData(`${URL}`);
            if (_data == "Oops, API Key is Incorrect!" || !_data.status) {
                if (count == 5) {
                    result = false
                    break
                }
                count = count + 1
            } else if (_data.status) {
                result = {
                    retry_count: count,
                    ..._data
                }
                break
            }
        }
        return result
    } else {
        return false
    }
}
async function search(query: string): Promise<object|boolean> {
    const URL = await API_SEARCH();
    if (URL) {
        let count: number = 0;
        let result: any
        while (true) {
            const _data = await FetchData(`${URL}`);
            if (_data == "Oops, API Key is Incorrect!" || !_data.status) {
                if (count == 5) {
                    result = false
                    break
                }
                count = count + 1
            } else if (_data.status) {

                // TODO: Cari category_name yang mirip-mirip di Array categories
                // TODO: Find similar category_name in Array categories
                try {
                    const arrData = _data.categories.filter((val: any) => {
                        return val.category_name === query // return object kosong
                    })
                    result = {
                        retry_count: count,
                        ...arrData
                    }
                } catch (error: any) {
                    console.log(error)
                    result = false
                }
                //
                break
            }
        }
        return result
    } else {
        return false
    }
}
search("naruto").then((a: object|boolean) => console.log(a))
