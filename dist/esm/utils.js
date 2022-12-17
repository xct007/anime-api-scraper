import axios from "axios";
const API_URL = "https://pencarinafkah.xyz/com.animeku.animechannelsubindoandsubenglish";
const API_LATEST = async (page, limit) => {
    const Data = await keyApi();
    if (Data) {
        return `${Data.baseUrl}/api/get_videos?page=${page}&count=${limit}&api_key=${Data.apikey}`;
    }
    else {
        return false;
    }
};
const API_SEARCH = async () => {
    const Data = await keyApi();
    if (Data) {
        return `${Data.baseUrl}/api/get_category_genre?search=&sort=c.category_name%20ASC&api_key=${Data.apikey}`;
    }
    else {
        return false;
    }
};
const API_POST = async (vid) => {
    const Data = await keyApi();
    if (Data) {
        return `${Data.baseUrl}/api/get_post_detail?id=${vid}`;
    }
    else {
        return false;
    }
};
const API_VIDEOS = async (id) => {
    const Data = await keyApi();
    if (Data) {
        return `${Data.baseUrl}/api/get_category_videos?id=${id}&page=1&count=1200&sort=n.id%20DESC&api_key=${Data.apikey}`;
    }
    else {
        return false;
    }
};
async function keyApi() {
    const { data } = await axios.get(API_URL, {
        headers: {
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 12; M2007J20CG Build/SKQ1.211019)",
        },
    });
    if (data) {
        const isOk = data === null || data === void 0 ? void 0 : data.Iklan[0];
        if (isOk.status == "ok") {
            return {
                status: true,
                baseUrl: isOk.webbase,
                api_yt: isOk.api_yt,
                apikey: isOk.apikey,
            };
        }
        else {
            return {
                status: false,
            };
        }
    }
    else {
        return {
            status: false,
        };
    }
}
const FetchData = async (url) => {
    const { data } = await axios.get(`${url}`, {
        headers: {
            //"Data-Agent": "Your Videos Channel",
            "User-Agent": "Dalvik/7.1.12.1.0 (com.animeku.animechannelsubindoandsubenglish U; Android ; 20175 Build/NMF260)",
            //"Accept": "application/vnd.yourapi.v1.full+json",
            "Accept-Encoding": " ",
        },
    });
    return data;
};
export { API_LATEST, API_SEARCH, API_VIDEOS, API_POST, FetchData };
//# sourceMappingURL=utils.js.map