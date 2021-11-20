import { Z_APPS_TOP_URL } from "../const/public";
import { ServerResponse } from "../types/fetch";
import { getErrorMessage } from "./error";

export function fetchZApps(url: string) {
    console.log("fetch Z-Apps:", url);
    return fetch(`${Z_APPS_TOP_URL}/${url}`);
}

export type Apis = {
    url: string;
    params: { [key: string]: unknown };
    response: unknown;
};

export async function fetchGet<T extends Apis>(
    url: T["url"],
    params: T["params"]
): Promise<ServerResponse<T["response"]>> {
    try {
        const paramKeys = Object.keys(params) as (keyof typeof params)[];
        const strParams = paramKeys.length
            ? "?" + paramKeys.map(key => `${key}=${params[key]}`).join("&")
            : "";
        const response = await fetch(url + strParams);
        const result: ServerResponse<T["response"]> = await response.json();
        return result;
    } catch (e) {
        return {
            responseType: "system_error",
            message: getErrorMessage(e),
        } as const;
    }
}

export async function fetchPost<T, U extends ServerResponse<unknown>>(
    url: string,
    params: T
) {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: { "Content-Type": "application/json" },
        });
        const result: U = await response.json();
        return result;
    } catch (e) {
        return {
            responseType: "system_error",
            message: getErrorMessage(e),
        } as const;
    }
}
