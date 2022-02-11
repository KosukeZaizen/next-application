import { GetServerSideProps } from "next";
import { ArticlesProps, Page } from "../../../components/articles/Articles";
import { domain, siteName } from "../../../components/articles/Home";
import { getImgNumber } from "../../../components/articles/Layout";
import { fetchZAppsFromServerSide } from "../../../lib/fetch";
import { makeIndexInfo } from "../../api/articles/getArticleProps";
import Articles from "../[[...path]]";

export default Articles;

export const getServerSideProps: GetServerSideProps<
    ArticlesProps,
    { pageName: string }
> = async ({ params }) => {
    try {
        const pageName = params?.pageName;
        if (!pageName) {
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
            `api/Articles/GetArticleForEdit?p=${pageName}`
        );
        const {
            url,
            description,
            title,
            isAboutFolktale,
            articleContent,
            authorId,
        }: Page = await response.json();

        const authorPromise = fetchZAppsFromServerSide(
            "api/Articles/GetAllAuthors"
        );

        const indexInfo = makeIndexInfo(articleContent);

        // Other articles
        const param = `?num=10&${
            isAboutFolktale ? "&isAboutFolktale=true" : ""
        }`;
        const articles: Page[] = await (
            await fetchZAppsFromServerSide(
                "api/Articles/GetRandomArticles" + param
            )
        ).json();

        const otherArticles = articles.filter(a => a.title !== title);

        return {
            props: {
                pageType: "article",
                pageName,
                url,
                description,
                title,
                isAboutFolktale,
                articleContent,
                indexInfo,
                imgNumber: getImgNumber(pageName.length),
                otherArticles,
                authorId,
                allAuthors: await (await authorPromise).json(),
                helmetProps: {
                    title,
                    desc: description,
                    domain,
                    siteName,
                    noindex: true,
                },
            },
        };
    } catch {
        return { notFound: true };
    }
};
