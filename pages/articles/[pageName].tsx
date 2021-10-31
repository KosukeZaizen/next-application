import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import * as React from "react";
import { Markdown } from "../../components/articles/Markdown";
import CharacterComment from "../../components/shared/CharacterComment";
import { AnchorLink } from "../../components/shared/HashScroll";
import { Helmet } from "../../components/shared/Helmet";
import { ScrollBox } from "../../components/shared/ScrollBox";
import ShurikenProgress from "../../components/shared/ShurikenProgress";
import { YouTubeAd } from "../../components/shared/YouTubeAd";
import { fetchZApps } from "../../lib/fetch";

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
}

export function getImgNumber() {
    return Math.ceil(Math.random() * 3);
}

const Articles = ({
    title,
    description,
    articleContent,
    isAboutFolktale,
    indexInfo,
    otherArticles,
}: Props) => {
    return (
        <div style={{ width: "100%" }} className="center">
            <Helmet title={title} desc={description} />
            <ArticleContent
                title={title}
                description={description}
                imgNumber={0}
                width={1000}
                content={articleContent}
                adsense={true}
                otherArticles={otherArticles}
                indexInfo={indexInfo}
            />
            {/* <HashScroll location={location} /> */}
        </div>
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
    imgNumber: number;
    width: number;
    indexInfo: IndexInfo;
    content: string;
    adsense: boolean;
    otherArticles: Page[];
}
export function ArticleContent({
    title,
    description,
    imgNumber,
    width,
    indexInfo,
    content,
    //adsense,
    otherArticles,
}: ArticleContentProps) {
    const isWide = width > 991;

    return (
        <main style={{ maxWidth: 800 }}>
            <BreadCrumbs title={title} />
            <article style={{ textAlign: "left" }}>
                {title ? (
                    <h1
                        style={{
                            margin: "25px auto 30px",
                            textAlign: "center",
                        }}
                        className="whiteShadow"
                    >
                        {title}
                    </h1>
                ) : (
                    <ShurikenProgress size="10%" />
                )}
                <CharacterComment
                    imgNumber={imgNumber}
                    screenWidth={width}
                    comment={description || <ShurikenProgress size="20%" />}
                    style={{
                        marginBottom: 15,
                    }}
                    commentStyle={{ paddingLeft: 25, paddingRight: 20 }}
                />
                <IndexAndAd isWide={isWide} indexInfo={indexInfo} />
                {content ? (
                    <Markdown
                        source={content}
                        style={{ margin: "25px 0 40px", textShadow }}
                    />
                ) : (
                    <ShurikenProgress size="10%" />
                )}
            </article>
        </main>
    );
}

function BreadCrumbs({ title }: { title: string }) {
    return (
        <div
            className="breadcrumbs"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            style={{ textAlign: "left" }}
        >
            <span
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
            >
                <Link href="/">
                    <a
                        itemProp="item"
                        style={{
                            marginRight: "5px",
                            marginLeft: "5px",
                        }}
                    >
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
                <span
                    itemProp="name"
                    style={{
                        marginRight: "5px",
                        marginLeft: "5px",
                    }}
                >
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
            style={{
                display: "flex",
                flexDirection: isWide ? "row" : "column",
            }}
        >
            <ScrollBox
                style={{
                    display: "inline-block",
                    flex: 1,
                    marginRight: isWide ? 30 : undefined,
                }}
            >
                <div
                    style={{
                        fontSize: "large",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "large",
                        }}
                    >
                        Index
                    </span>
                    {indexInfo && indexInfo.length > 0 ? (
                        <ol
                            style={{
                                display: "inline-block",
                                margin: 0,
                            }}
                        >
                            {indexInfo.map(ind => (
                                <li
                                    key={ind.linkText}
                                    style={{ marginTop: 10, marginBottom: 5 }}
                                >
                                    <AnchorLink
                                        targetHash={`#${ind.encodedUrl}`}
                                    >
                                        {ind.linkText}
                                    </AnchorLink>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <ShurikenProgress size="20%" />
                    )}
                </div>
            </ScrollBox>
            <div
                style={{
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
                },
                revalidate: 10,
            };
        } catch {
            return { notFound: true, revalidate: 10 };
        }
    };
