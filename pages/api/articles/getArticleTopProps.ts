import { fetchZAppsFromServerSide } from "../../../lib/fetch";
import { apiGet } from "../../../lib/nextApi";
import { EmptyObject } from "../../../types/util";
import { desc, domain, Props, siteName } from "../../articles";

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
    const pagesPromise = fetchZAppsFromServerSide(
        "api/Articles/GetAllArticles"
    );
    const authorPromise = fetchZAppsFromServerSide(
        `api/Articles/GetAuthorInfo?authorId=1`
    );

    return {
        pages: await (await pagesPromise).json(),
        author: await (await authorPromise).json(),
        helmetProps: {
            title: siteName,
            desc,
            domain,
            siteName,
        },
    };
}
