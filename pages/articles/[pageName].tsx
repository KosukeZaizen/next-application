import { css } from "@emotion/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { Layout } from "../../components/articles/Layout";
import { Markdown } from "../../components/articles/Markdown";
import CharacterComment from "../../components/shared/CharacterComment";
import { Helmet } from "../../components/shared/Helmet";
import { ScrollBox } from "../../components/shared/ScrollBox";
import { YouTubeAd } from "../../components/shared/YouTubeAd";
import { fetchZApps } from "../../lib/fetch";
import { useScreenSize } from "../../lib/screenSize";

export interface Page {
    url?: string;
    title: string;
    description: string;
    articleContent: string;
    imgPath?: string;
    isAboutFolktale?: boolean;
}

type IndexInfo = {
    linkText: string;
    encodedUrl: string;
}[];

interface Props extends Page {
    indexInfo: IndexInfo;
    otherArticles: Page[];
    imgNumber: number;
}

export function getImgNumber(num: number = 0) {
    const today = new Date();
    const todayNumber = today.getMonth() + today.getDate() + num;
    const mod = todayNumber % 30;
    if (mod > 22) return 2;
    if (mod > 14) return 3;
    return 1;
}

const Articles = ({
    title,
    description,
    articleContent,
    isAboutFolktale,
    indexInfo,
    otherArticles,
    imgNumber,
}: Props) => {
    const { screenWidth, screenHeight } = useScreenSize();
    return (
        <Layout screenWidth={screenWidth} screenHeight={screenHeight}>
            <div css={containerCss}>
                <Helmet title={title} desc={description} />
                <ArticleContent
                    title={title}
                    description={description}
                    width={screenWidth}
                    content={articleContent}
                    adsense={true}
                    otherArticles={otherArticles}
                    indexInfo={indexInfo}
                    imgNumber={imgNumber}
                />
            </div>
        </Layout>
    );
};

// export const excludedArticleTitles = ["Kamikaze"];
export const excludedArticleTitles = [];

// 0 から 4.9 まで 0.1 刻み
const textShadow = Array.from(Array(50).keys())
    .map(n => `0 0 ${n / 10}px white`)
    .join(",");

interface ArticleContentProps {
    title: string;
    description: string;
    width: number;
    indexInfo: IndexInfo;
    content: string;
    adsense: boolean;
    otherArticles: Page[];
    imgNumber: number;
}
export function ArticleContent({
    title,
    description,
    width,
    indexInfo,
    content,
    //adsense,
    otherArticles,
    imgNumber,
}: ArticleContentProps) {
    const isWide = width > 991;

    return (
        <main css={mainCss}>
            <BreadCrumbs title={title} />
            <article css={articleCss}>
                <h1 css={h1TitleCss}>{title}</h1>
                <CharacterComment
                    imgNumber={imgNumber}
                    screenWidth={width}
                    comment={description}
                    css={characterCommentCss}
                    commentStyle={commentCss}
                />
                <IndexAndAd isWide={isWide} indexInfo={indexInfo} />
                <Markdown source={content} style={markdownCss} />
            </article>
        </main>
    );
}

function BreadCrumbs({ title }: { title: string }) {
    return (
        <div
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            css={breadCrumbsContainerCss}
        >
            <span
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
            >
                <Link href="/">
                    <a itemProp="item" css={breadCrumbsCss}>
                        <span itemProp="name">{"Home"}</span>
                    </a>
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
            }}
        >
            <ScrollBox
                style={css`
                    display: inline-block;
                    flex: 1;
                    margin-right: ${isWide ? 30 : undefined};
                `}
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
            <div
                css={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    marginTop: isWide ? undefined : 25,
                }}
            >
                <YouTubeAd width={isWide ? "90%" : undefined} />
            </div>
        </div>
    );
}

export default Articles;

export const getStaticPaths: GetStaticPaths = async () => {
    const response: Response = await fetchZApps("api/Articles/GetAllArticles");
    const pages: Page[] = await response.json();
    return {
        paths: pages
            .map(p => p.url?.toLowerCase())
            .filter(u => u)
            .map(u => `/articles/${u}`),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<Props, { pageName: string }> =
    async ({ params }) => {
        try {
            const pageName = params?.pageName;
            if (!pageName) {
                return { notFound: true, revalidate: 10 };
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
            const response: Response = await fetchZApps(
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
            const responseOther: Response = await fetchZApps(
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
                    url,
                    description,
                    title,
                    isAboutFolktale,
                    articleContent,
                    imgPath,
                    indexInfo,
                    otherArticles,
                    imgNumber: getImgNumber(pageName.length),
                },
                revalidate: 10,
            };
        } catch {
            return { notFound: true, revalidate: 10 };
        }
    };

export const whiteShadowStyle = css`
    text-shadow: 0px 0px 1px white, 0px 0px 2px white, 0px 0px 3px white,
        0px 0px 4px white, 0px 0px 5px white, 0px 0px 5px white,
        0px 0px 5px white, 0px 0px 5px white, 0px 0px 5px white,
        0px 0px 5px white, 0px 0px 5px white, 0px 0px 5px white,
        0px 0px 5px white, 0px 0px 5px white, 0px 0px 5px white,
        0px 0px 6px white, 1px 1px 6px white, -1px 1px 6px white,
        1px -1px 6px white, -1px -1px 6px white, 2px 2px 6px white,
        -2px 2px 6px white, 2px -2px 6px white, -2px -2px 6px white,
        3px 3px 6px white, -3px 3px 6px white, 3px -3px 6px white,
        -3px -3px 6px white, 0px 0px 8px white, 1px 1px 8px white,
        -1px 1px 8px white, 1px -1px 8px white, -1px -1px 8px white,
        2px 2px 8px white, -2px 2px 8px white, 2px -2px 8px white,
        -2px -2px 8px white, 3px 3px 8px white, -3px 3px 8px white,
        3px -3px 8px white, -3px -3px 8px white, 0px 0px 10px white,
        1px 1px 10px white, -1px 1px 10px white, 1px -1px 10px white,
        -1px -1px 10px white, 2px 2px 10px white, -2px 2px 10px white,
        2px -2px 10px white, -2px -2px 10px white, 3px 3px 10px white,
        -3px 3px 10px white, 3px -3px 10px white, -3px -3px 10px white,
        3px 3px 10px white, -3px 3px 10px white, 3px -3px 10px white,
        -3px -3px 10px white;
`;

export const centerStyle = css`
    text-align: center;
    & * {
        margin-right: auto;
        margin-left: auto;
    }
`;

const mainCss = css`
    max-width: 800px;
`;

const articleCss = css`
    text-align: left;
`;

const h1TitleCss = css`
    margin: 25px auto 30px;
    text-align: center;
    ${whiteShadowStyle}
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
`;

const breadCrumbsContainerCss = css`
    text-align: left;
    ${whiteShadowStyle}
`;

const breadCrumbsCss = css`
    margin-right: 5px;
    margin-left: 5px;
`;

const markdownCss = css`
    margin: 25px 0 40px;
    ${textShadow};
`;

const characterCommentCss = css`
    margin-bottom: 15px;
`;

const commentCss = css`
    padding-left: 25px;
    padding-right: 20px;
`;

const containerCss = css`
    width: 100%;
    ${centerStyle}
`;
