import { getImgNumber } from "../../../components/articles/Layout";
import { fetchZAppsFromServerSide } from "../../../lib/fetch";
import { apiGet } from "../../../lib/nextApi";
import { GetParams } from "../../../types/next";
import { domain, siteName } from "../../articles";
import { Page, Props } from "../../articles/[pageName]";

export interface GetArticleProps {
    url: "/api/articles/getArticleProps";
    params: Params;
    response: Response;
}
type Params = { pageName: string };
type Response = Props;

const handler = async ({ pageName }: GetParams<Params>): Promise<Response> => {
    if (typeof pageName !== "string") {
        throw new Error();
    }
    return await getArticleProps(pageName);
};

export default apiGet<GetArticleProps>(handler);

export async function getArticleProps(pageName: string): Promise<Props> {
    // Article
    const page: Page = await (
        await fetchZAppsFromServerSide(`api/Articles/GetArticle?p=${pageName}`)
    ).json();

    const {
        url,
        description,
        title,
        isAboutFolktale,
        articleContent,
        imgPath,
    } = page;

    // Other articles
    const param = `?num=10&${isAboutFolktale ? "&isAboutFolktale=true" : ""}`;
    const articles: Page[] = await (
        await fetchZAppsFromServerSide("api/Articles/GetRandomArticles" + param)
    ).json();

    const otherArticles = articles.filter(a => a.title !== title);

    const indexInfo = articleContent
        .split("\n")
        .filter(c => c.includes("##") && !c.includes("###"))
        .map(c => {
            const linkText = c.split("#").join("").trim();
            const encodedUrl = encodeURIComponent(linkText);
            return { linkText, encodedUrl };
        });

    return {
        pageName,
        url,
        description,
        title,
        isAboutFolktale,
        articleContent,
        imgPath,
        indexInfo,
        otherArticles,
        imgNumber: getImgNumber(pageName.length),
        helmetProps: {
            title,
            desc: description,
            domain,
            ogImg: imgPath,
            siteName,
        },
    };
}
