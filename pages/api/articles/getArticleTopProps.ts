import { fetchZAppsFromServerSide } from "../../../lib/fetch";
import { apiGet } from "../../../lib/nextApi";
import { EmptyObject } from "../../../types/util";
import { desc, domain, Props, siteName } from "../../articles";
import { Page } from "../../articles/[pageName]";

export interface GetArticleTopProps {
    url: "/api/articles/getArticleTopProps";
    params: Params;
    response: Response;
}
type Params = EmptyObject;
type Response = Props;

const handler = async (): Promise<Response> => {
    return getArticleTopProps();
};

export default apiGet<GetArticleTopProps>(handler);

export async function getArticleTopProps(): Promise<Response> {
    const response = await fetchZAppsFromServerSide(
        "api/Articles/GetAllArticles"
    );
    const pages: Page[] = await response.json();
    return {
        pages,
        helmetProps: {
            title: siteName,
            desc,
            domain,
            siteName,
        },
    };
}
