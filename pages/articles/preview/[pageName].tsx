import { GetServerSideProps } from "next";
import { domain, siteName } from "..";
import { getImgNumber } from "../../../components/articles/Layout";
import { fetchZAppsFromServerSide } from "../../../lib/fetch";
import Articles, { Page, Props } from "../[pageName]";

export default Articles;

export const getServerSideProps: GetServerSideProps<
    Props,
    { pageName: string }
> = async ({ query }) => {
    try {
        const pageName = query.pageName;
        if (!pageName || typeof pageName !== "string") {
            return { notFound: true };
        }

        // Redirect to lower case
        const lowerPageName = pageName.toLowerCase();
        if (pageName !== lowerPageName) {
            return {
                redirect: {
                    permanent: true,
                    destination: lowerPageName,
                },
            };
        }

        // Article
        const response: Response = await fetchZAppsFromServerSide(
            `api/Articles/GetArticle?p=${pageName}`
        );
        const {
            url,
            description,
            title,
            isAboutFolktale,
            articleContent,
            imgPath,
        }: Page = await response.json();

        // Other articles
        const param = `?num=10&${
            isAboutFolktale ? "&isAboutFolktale=true" : ""
        }`;
        const responseOther: Response = await fetchZAppsFromServerSide(
            "api/Articles/GetRandomArticles" + param
        );
        const articles: Page[] = await responseOther.json();
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
            props: {
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
                    noindex: true,
                },
            },
        };
    } catch {
        return { notFound: true };
    }
};
