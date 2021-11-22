import { fetchZAppsFromServerSide } from "../../../lib/fetch";
import { apiPost } from "../../../lib/nextApi";
import { default as FormData } from "form-data";

export interface ZAppsFetch<T = unknown> {
    url: "/api/zApps";
    params: Params;
    response: T;
}
type Params = {
    url: string;
    init?: RequestInit;
    convertIntoFormData?: boolean;
};

const handler = async ({
    url,
    init,
    convertIntoFormData,
}: Params): Promise<Response> => {
    if (
        convertIntoFormData &&
        typeof init?.body === "string" &&
        init.method === "POST"
    ) {
        const formData = new FormData();

        const bodyObj = JSON.parse(init.body);
        const keys = Object.keys(bodyObj) as (keyof typeof bodyObj)[];
        keys.forEach(key => formData.append(key.toString(), bodyObj[key]));

        const response = await fetchZAppsFromServerSide(url, {
            method: "POST",
            body: formData as any,
        });
        return await response.json();
    }

    const response = await fetchZAppsFromServerSide(url, init);
    return await response.json();
};

export default apiPost<ZAppsFetch>(handler);
