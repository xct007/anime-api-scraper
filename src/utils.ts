import axios from 'axios';
const API_URL = 'https://pencarinafkah.xyz/com.animeku.animechannelsubindoandsubenglish'

const API_LATEST = async(page: number, limit: number): Promise<string|boolean> => {
    const Data = await keyApi();
    if (Data) {
        return `${Data.baseUrl}/api/get_videos?page=${page}&count=${limit}&api_key=${Data.apikey}`
    } else {
        return false
    }
}
const API_SEARCH = async(): Promise<string|boolean> => {
    const Data = await keyApi();
    if (Data) {
        return `${Data.baseUrl}/api/get_category_genre?search=&sort=c.category_name%20ASC&api_key=${Data.apikey}`
    } else {
        return false
    }
}
type RespOnKey = {
    status: boolean,
    baseUrl?: string,
    api_yt?: string,
    apikey?: string
}
async function keyApi(): Promise<RespOnKey> {
    const { data } = await axios.get(API_URL, {
        headers: {
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 12; M2007J20CG Build/SKQ1.211019)"
        }
    });
    if (data) {
        const isOk = data?.Iklan[0]
        if (isOk.status == 'ok') {
            return {
                status: true,
                baseUrl: isOk.webbase,
                api_yt: isOk.api_yt,
                apikey: isOk.apikey
            }
        } else {
            return {
                status: false
            }
        }
    } else {
        return {
            status: false
        }
    }
}
const FetchData = async(url: string): Promise<any> => {
    const { data } = await axios.get(`${url}`, {
        headers: {
            //"Data-Agent": "Your Videos Channel",
            "User-Agent": "Dalvik/7.1.12.1.0 (com.animeku.animechannelsubindoandsubenglish U; Android ; 20175 Build/NMF260)",
            //"Accept": "application/vnd.yourapi.v1.full+json",
            "Accept-Encoding": " "
        }
    })
    return data
}
export { API_LATEST, API_SEARCH, FetchData }
