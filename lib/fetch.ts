import { Z_APPS_TOP_URL } from "../const/public";
import { ZAppsFetch } from "../pages/api/zApps";
import { ServerResponse } from "../types/fetch";
import { getErrorMessage } from "./error";

export function fetchZAppsFromServerSide(url: string, init?: RequestInit) {
    return fetch(`${Z_APPS_TOP_URL}/${url}`, init);
}

export function fetchZAppsFromFrontEnd<T>(
    url: string,
    init?: RequestInit,
    convertIntoFormData?: boolean
) {
    return fetchPost<ZAppsFetch<T>>(`/api/zApps`, {
        url,
        init,
        convertIntoFormData,
    });
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

export async function fetchPost<T extends Apis>(
    url: T["url"],
    params: T["params"]
): Promise<ServerResponse<T["response"]>> {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: { "Content-Type": "application/json" },
        });
        const result: ServerResponse<T["response"]> = await response.json();
        return result;
    } catch (e) {
        return {
            responseType: "system_error",
            message: getErrorMessage(e),
        } as const;
    }
}
