export function fetchZApps(url: string) {
    console.log("fetch Z-Apps:", url);
    return fetch(`https://articles.lingual-ninja.com/${url}`);
}
