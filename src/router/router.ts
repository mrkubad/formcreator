export default class Router {
    static getParam(key: string): string {
        const query: string = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query);
        return urlParams.get(key);
    }
}