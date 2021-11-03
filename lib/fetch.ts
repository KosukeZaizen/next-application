import { ServerResponse } from "../types/fetch";
import { getErrorMessage } from "./error";

export function fetchZApps(url: string) {
    console.log("fetch Z-Apps:", url);
    return fetch(`https://articles.lingual-ninja.com/${url}`);
}

export async function fetchGetJson<T extends ServerResponse<unknown>>(
    url: string
) {
    try {
        const response = await fetch(url);
        const result: T = await response.json();
        return result;
    } catch (e) {
        return {
            responseType: "system_error",
            message: getErrorMessage(e),
        } as const;
    }
}
