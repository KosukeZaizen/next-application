import { css } from "@emotion/react";

import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { ArticlesList } from "../../components/articles/ArticlesList";
import {
    Author,
    AuthorArea,
    AuthorCard,
} from "../../components/articles/Author";
import {
    FullScreenShuriken,
    h1TitleCss,
    Layout,
    whiteShadowStyle,
} from "../../components/articles/Layout";
import { Markdown } from "../../components/articles/Markdown";
import {
    FBShareBtn,
    TwitterShareBtn,
} from "../../components/articles/SnsShareButton";
import CharacterComment from "../../components/shared/CharacterComment";
import FB from "../../components/shared/FaceBook";
import { HelmetProps } from "../../components/shared/Helmet";
import { Link } from "../../components/shared/Link/LinkWithYouTube";
import { ScrollBox } from "../../components/shared/ScrollBox";
import { YouTubeAd } from "../../components/shared/YouTubeAd";
import { Z_APPS_TOP_URL } from "../../const/public";
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

export function Articles(props: ArticlesProps) {
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
            helmetProps={helmetProps}
            author={author}
            maxWidth={maxWidth}
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
    description,
    screenWidth,
    indexInfo,
    content,
    otherArticles,
    imgNumber,
    pageName,
    author,
    allAuthors,
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
            <BreadCrumbs title={title} screenWidth={screenWidth} />
            <article css={articleCss}>
                <h1 css={h1TitleCss}>{title}</h1>

                <CharacterComment
                    imgNumber={imgNumber}
                    screenWidth={screenWidth}
                    comment={description}
                    css={characterCommentCss}
                    commentStyle={commentCss}
                    loading="noTime"
                />

                <IndexAndAd isWide={isWide} indexInfo={indexInfo} />

                <AuthorCard
                    author={author}
                    screenWidth={screenWidth}
                    style={{ marginTop: 30 }}
                />

                <Markdown source={content} style={markdownStyle} />
            </article>

            <CharacterComment
                comment={
                    <>
                        <p>{"If you like this article, please share!"}</p>
                        <FBShareBtn
                            urlToShare={`${Z_APPS_TOP_URL}/articles/${pageName}`}
                            imgStyle={fbButtonStyle}
                            containerStyle={snsButtonContainerStyle}
                        />
                        <TwitterShareBtn
                            urlToShare={`${Z_APPS_TOP_URL}/articles/${pageName}`}
                            textToShare={title}
                            imgStyle={twitterButtonStyle}
                            containerStyle={snsButtonContainerStyle}
                        />
                    </>
                }
                imgNumber={(imgNumber - 1 || 3) - 1 || 3}
                screenWidth={screenWidth}
                loading="noTime"
            />
            <hr />
            <AuthorArea
                style={AuthorStyle}
                screenWidth={screenWidth}
                author={author}
            />
            <hr />
            {otherArticles.length > 0 && (
                <section>
                    <h2 css={h2Style}>More Articles</h2>
                    <ArticlesList
                        titleH={"h3"}
                        articles={otherArticles}
                        screenWidth={screenWidth}
                        allAuthors={allAuthors}
                    />
                </section>
            )}
            <hr />
            <FB style={fbStyle} screenWidth={screenWidth} />
        </main>
    );
}

const fbStyle = css({ textAlign: "center" });

const AuthorStyle = css({ marginTop: 45 });

const fbButtonStyle = css({
    width: 200,
    marginTop: 15,
});

const twitterButtonStyle = css({
    width: 200,
    marginTop: 5,
});

const snsButtonContainerStyle = css({
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
});

const h2Style = css`
    margin: 55px 0 55px;
    padding: 20px;
    color: white;
    background: linear-gradient(to top, #035c1d, #047c28);
    border-radius: 5px;
    text-align: center;
`;

function BreadCrumbs({
    title,
    screenWidth,
}: {
    title: string;
    screenWidth: number;
}) {
    const homeRef = useRef<HTMLSpanElement>(null);
    const [homeWidth, setHomeWidth] = useState(68);

    useEffect(() => {
        if (homeRef.current) {
            setHomeWidth(homeRef.current.offsetWidth + 5);
        }
    }, [screenWidth]);

    return (
        <div css={breadCrumbsBlockCss}>
            <span css={breadHomeSpanCss} ref={homeRef}>
                <a href={Z_APPS_TOP_URL} css={breadHomeAnchorCss}>
                    Home
                </a>
                {" > "}
            </span>
            <div
                itemScope
                itemType="https://schema.org/BreadcrumbList"
                css={breadCrumbsContainerCss}
            >
                <span
                    itemProp="itemListElement"
                    itemScope
                    itemType="http://schema.org/ListItem"
                    css={{ marginLeft: homeWidth }}
                >
                    <Link
                        href="/articles"
                        itemProp="item"
                        pCss={breadCrumbsCss}
                    >
                        <span itemProp="name">{"Articles"}</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                </span>
                {" > "}
                <span
                    itemProp="itemListElement"
                    itemScope
                    itemType="http://schema.org/ListItem"
                >
                    <span itemProp="name" css={breadCrumbsCss}>
                        {title}
                    </span>
                    <meta itemProp="position" content="2" />
                </span>
            </div>
        </div>
    );
}

function IndexAndAd({
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
            </ScrollBox>
            {isWide && (
                <div css={adStyle}>
                    <YouTubeAd width="90%" />
                </div>
            )}
        </div>
    );
}

const adStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
};

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

const breadCrumbsContainerCss = css`
    text-align: left;
    ${whiteShadowStyle}
`;

const breadCrumbsCss = css`
    margin-right: 5px;
    margin-left: 5px;
`;

const markdownStyle = {
    margin: "25px 0 40px",
    textShadow,
};

const characterCommentCss = css`
    margin-bottom: 15px;
`;

const commentCss = css`
    padding-left: 25px;
    padding-right: 20px;
`;

const breadHomeSpanCss = css([
    whiteShadowStyle,
    { position: "absolute", top: 0, left: 0 },
]);

const breadHomeAnchorCss = { marginRight: 5 };

const breadCrumbsBlockCss = { position: "relative" } as const;
