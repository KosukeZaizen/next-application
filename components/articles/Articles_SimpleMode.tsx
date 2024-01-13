import { css } from "@emotion/react";

import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Author } from "./Author";
import { FullScreenShuriken, h1TitleCss, Layout } from "./Layout";
import { Markdown } from "./Markdown";
import { HelmetProps } from "../shared/Helmet";
import { ScrollBox } from "../shared/ScrollBox";
import { fetchGet } from "../../lib/fetch";
import { useHashScroll } from "../../lib/hooks/useHashScroll";
import { useIsFirstRender } from "../../lib/hooks/useIsFirstRender";
import { useScreenSize } from "../../lib/hooks/useScreenSize";
import { sleepAsync } from "../../lib/sleep";

import { GetArticleProps } from "../../pages/api/articles/getArticleProps";

export interface Page {
    url?: string;
    title: string;
    description: string;
    articleContent: string;
    imgPath?: string;
    isAboutFolktale?: boolean;
    authorId: number;
}

export type IndexInfo = {
    linkText: string;
    encodedUrl: string;
}[];

export interface ArticlesProps extends Page {
    pageType: "article";
    indexInfo: IndexInfo;
    otherArticles: Page[];
    imgNumber: number;
    pageName: string;
    helmetProps: HelmetProps;
    allAuthors: Author[];
    author?: Author;
}

export function SimpleArticles(props: ArticlesProps) {
    const { screenWidth, screenHeight } = useScreenSize();

    const {
        title,
        description,
        articleContent,
        indexInfo,
        otherArticles,
        imgNumber,
        pageName,
        helmetProps,
        allAuthors,
        author,
    } = useRevisedProps(props);

    return (
        <Layout
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            helmetProps={{ ...helmetProps, noindex: true }}
            author={author}
            maxWidth={maxWidth}
            isSimpleMode
        >
            <ArticleContent
                title={title}
                description={description}
                screenWidth={screenWidth}
                content={articleContent}
                otherArticles={otherArticles}
                indexInfo={indexInfo}
                imgNumber={imgNumber}
                pageName={pageName}
                author={author}
                allAuthors={allAuthors}
            />
        </Layout>
    );
}

function useRevisedProps(props: ArticlesProps) {
    const [_props, setProps] = useState<ArticlesProps>(props);

    useEffect(() => {
        // Redirect to lower case (in case where the redirection in getStaticProps doesn't work)
        if (
            window.location.pathname !== window.location.pathname.toLowerCase()
        ) {
            window.location.href =
                window.location.href.split("/articles/")[0] +
                "/articles/" +
                props.pageName.toLowerCase();
            return;
        }
    }, [props.pageName]);

    useEffect(() => {
        (async () => {
            await sleepAsync(200);
            const result = await fetchGet<GetArticleProps>(
                "/api/articles/getArticleProps",
                {
                    pageName: props.pageName,
                }
            );
            if (result.responseType === "success") {
                // Don't replace otherArticles
                setProps({ ...result, otherArticles: props.otherArticles });
            }
        })();
    }, [props.pageName, props.otherArticles]);

    return _props;
}

// export const excludedArticleTitles = ["Kamikaze"];
export const excludedArticleTitles = [];

// 0 から 4.9 まで 0.1 刻み
const textShadow = Array.from(Array(50).keys())
    .map(n => `0 0 ${n / 10}px white`)
    .join(",");

interface ArticleContentProps {
    title: string;
    description: string;
    screenWidth: number;
    indexInfo: IndexInfo;
    content: string;
    otherArticles: Page[];
    imgNumber: number;
    pageName: string;
    author?: Author;
    allAuthors: Author[];
}
export function ArticleContent({
    title,
    screenWidth,
    indexInfo,
    content,
    pageName,
}: ArticleContentProps) {
    const isWide = screenWidth > 991;

    const { isFirstRender } = useIsFirstRender();
    useHashScroll(isFirstRender);

    const { query } = useRouter();
    if (!query.path || query.path[0] !== pageName) {
        // During the transition from another article
        return <FullScreenShuriken />;
    }

    return (
        <main css={mainCss}>
            <article css={articleCss}>
                <h1 css={h1TitleCss}>{title}</h1>

                <Index isWide={isWide} indexInfo={indexInfo} />

                <Markdown source={content} style={markdownStyle} />
            </article>
        </main>
    );
}

function Index({
    isWide,
    indexInfo,
}: {
    isWide: boolean;
    indexInfo: IndexInfo;
}) {
    return (
        <div
            css={{
                display: "flex",
                flexDirection: isWide ? "row" : "column",
                position: "relative",
                top: 15,
            }}
        >
            <ScrollBox
                pCss={css({
                    display: "inline-block",
                    flex: 1,
                    marginRight: isWide ? 30 : undefined,
                })}
            >
                <div css={indexContainerCss}>
                    <span css={indexTitleCss}>Index</span>
                    <div css={indexContentCss}>
                        <ol css={indexOlCss}>
                            {indexInfo.map(ind => (
                                <li key={ind.linkText} css={indexLiCss}>
                                    <a href={`#${ind.encodedUrl}`}>
                                        {ind.linkText}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </ScrollBox>
        </div>
    );
}

const maxWidth = 900;

const mainCss = css`
    max-width: ${maxWidth}px;
    overflow-x: hidden;
`;

const articleCss = css`
    text-align: left;
`;

const indexContainerCss = css`
    font-size: large;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const indexContentCss = css`
    display: flex;
    justify-content: center;
`;

const indexLiCss = css`
    margin-top: 10px;
    margin-bottom: 5px;
`;

const indexOlCss = css`
    display: inline-block;
    margin: 0;
`;

const indexTitleCss = css`
    font-weight: bold;
    font-size: large;
    margin-left: auto;
    margin-right: auto;
`;

const markdownStyle = {
    margin: "25px 0 40px",
    textShadow,
};
