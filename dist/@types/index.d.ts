declare function latest(page: number, limit: number): Promise<object | boolean>;
type searchResponse = {
    status: boolean;
    retry_count: number;
    result?: any[] | string;
};
declare function search(query: string): Promise<searchResponse | boolean>;
declare function detail(id: number): Promise<object | boolean>;
export { latest, search, detail };
//# sourceMappingURL=index.d.ts.map