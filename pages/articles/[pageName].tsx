import { css } from "@emotion/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { ArticlesList } from "../../components/articles/ArticlesList";
import { Author } from "../../components/articles/Author";
import { domain, siteName } from "../../components/articles/Home";
import {
    centerStyle,
    getImgNumber,
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
import { Helmet, HelmetProps } from "../../components/shared/Helmet";
import { ScrollBox } from "../../components/shared/ScrollBox";
import { YouTubeAd } from "../../components/shared/YouTubeAd";
import { Z_APPS_TOP_URL } from "../../const/public";
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
    pageName: string;
    helmetProps: HelmetProps;
}

const Articles = ({
    title,
    description,
    articleContent,
    indexInfo,
    otherArticles,
    imgNumber,
    pageName,
    helmetProps,
}: Props) => {
    const { screenWidth, screenHeight } = useScreenSize();
    return (
        <Layout screenWidth={screenWidth} screenHeight={screenHeight}>
            <Helmet {...helmetProps} />
            <ArticleContent
                title={title}
                description={description}
                width={screenWidth}
                content={articleContent}
                adsense={true}
                otherArticles={otherArticles}
                indexInfo={indexInfo}
                imgNumber={imgNumber}
                pageName={pageName}
            />
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
    pageName: string;
}
export function ArticleContent({
    title,
    description,
    width,
    indexInfo,
    content,
    otherArticles,
    imgNumber,
    pageName,
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
                <Markdown source={content} style={markdownStyle} />
            </article>
            <CharacterComment
                comment={[
                    <p key="commentContent">
                        {"If you like this article, please share!"}
                    </p>,
                    <FBShareBtn
                        key="fbShareButton"
                        urlToShare={`${Z_APPS_TOP_URL}/articles/${pageName}`}
                        style={fbButtonStyle}
                    />,
                    <TwitterShareBtn
                        key="twitterShareButton"
                        urlToShare={`${Z_APPS_TOP_URL}/articles/${pageName}`}
                        textToShare={title}
                        style={twitterButtonStyle}
                    />,
                ]}
                imgNumber={(imgNumber - 1 || 3) - 1 || 3}
                screenWidth={width}
            />
            <hr />
            <Author style={css({ marginTop: 45 })} screenWidth={width} />
            <hr />
            <section>
                <h2 css={h2Style}>More Articles</h2>
                <ArticlesList
                    titleH={"h3"}
                    articles={otherArticles}
                    screenWidth={width}
                />
            </section>
            <hr />
            <FB style={centerStyle} screenWidth={width} />
        </main>
    );
}

const fbButtonStyle = css({
    width: 200,
    marginTop: 15,
});

const twitterButtonStyle = css({
    width: 200,
    marginTop: 5,
});

const h2Style = css`
    margin: 55px 0 55px;
    padding: 20px;
    color: white;
    background: linear-gradient(to top, #035c1d, #047c28);
    border-radius: 5px;
`;

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
                        title: siteName,
                        desc: description,
                        domain,
                        ogImg: imgPath,
                        siteName,
                    },
                },
                revalidate: 10,
            };
        } catch {
            return { notFound: true, revalidate: 10 };
        }
    };

const mainCss = css`
    max-width: 800px;
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
