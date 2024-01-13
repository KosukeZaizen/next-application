import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ArticlesProps } from "../../../components/articles/Articles";
import { getArticleProps } from "../../api/articles/getArticleProps";
import { SimpleArticles } from "../../../components/articles/Articles_SimpleMode";

export default SimpleArticles;

export const getServerSideProps = async ({
    params,
}: GetServerSidePropsContext<{ path: string }>): Promise<
    GetServerSidePropsResult<ArticlesProps>
> => {
    try {
        const path = params?.path;
        if (!path || !Array.isArray(path) || path.length === 0) {
            return { notFound: true };
        }

        // Long path
        if (path.length > 1) {
            return { notFound: true };
        }

        const pageName = path[0];

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

        return {
            props: await getArticleProps(pageName, true),
        };
    } catch {
        return { notFound: true };
    }
};
