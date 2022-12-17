declare const API_LATEST: (page: number, limit: number) => Promise<string | boolean>;
declare const API_SEARCH: () => Promise<string | boolean>;
declare const API_POST: (vid: number) => Promise<string | boolean>;
declare const API_VIDEOS: (id: number) => Promise<string | boolean>;
declare const FetchData: (url: string) => Promise<any>;
export { API_LATEST, API_SEARCH, API_VIDEOS, API_POST, FetchData };
//# sourceMappingURL=utils.d.ts.map