import {
    GetStaticPaths,
    GetStaticPropsContext,
    GetStaticPropsResult,
} from "next";
import React from "react";

import { getArticleProps } from "../api/articles/getArticleProps";
import { getArticleTopProps } from "../api/articles/getArticleTopProps";
import Home, { Props as HomeProps } from "../../components/articles/Home";
import { Articles, ArticlesProps } from "../../components/articles/Articles";

export default function _Articles(props: ArticlesProps | HomeProps) {
    if (props.pageType === "home") {
        return <Home {...props} />;
    }
    return <Articles {...props} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], // Set an empty array to enable ISR in Azure App Service
        fallback: "blocking",
    };
};

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ path: string }>): Promise<
    GetStaticPropsResult<ArticlesProps | HomeProps>
> => {
    try {
        const path = params?.path;
        if (!path || !Array.isArray(path) || path.length === 0) {
            return {
                props: await getArticleTopProps(),
                revalidate: 5,
            };
        }

        // Long path
        if (path.length > 1) {
            return { notFound: true, revalidate: 5 };
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

        // including "&" without "?"
        if (pageName.includes("&")) {
            const beforeAmpersand = pageName.split("&")[0];
            if (
                !beforeAmpersand.includes("?") &&
                !beforeAmpersand.includes("#")
            ) {
                return { notFound: true, revalidate: 5 };
            }
        }

        // generate props
        const props = await getArticleProps(pageName);
        if (!props) {
            return { notFound: true, revalidate: 5 };
        }

        return {
            props,
            revalidate: 5,
        };
    } catch {
        return { notFound: true, revalidate: 5 };
    }
};
