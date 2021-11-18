import * as React from "react";
import { getClasses } from "../../lib/css";
import { Page } from "../../pages/articles/[pageName]";
import { LinkOrA } from "../shared/Link/LinkOrA";
import { ScrollBox } from "../shared/ScrollBox";
import ShurikenProgress from "../shared/ShurikenProgress";

interface ArticlesListProps {
    articles: Page[];
    screenWidth: number;
    titleH: "h2" | "h3";
    isTargetBlank?: boolean;
}
export function ArticlesList({
    articles,
    screenWidth,
    titleH,
    isTargetBlank,
}: ArticlesListProps) {
    const isWide = screenWidth > 767;

    const url = isTargetBlank
        ? "https://articles.lingual-ninja.com/articles"
        : "/articles";

    return (
        <>
            {articles.length > 0 ? (
                articles.map(page => (
                    <article key={page.title} css={c.article}>
                        <ScrollBox>
                            <LinkOrA href={`${url}/${page.url}`}>
                                {titleH === "h3" ? (
                                    <h3
                                        css={{
                                            fontSize: isWide
                                                ? "xx-large"
                                                : "x-large",
                                            textAlign: "center",
                                            width: "100%",
                                        }}
                                    >
                                        {page.title}
                                    </h3>
                                ) : (
                                    <h2
                                        css={{
                                            fontSize: isWide
                                                ? "xx-large"
                                                : "x-large",
                                            textAlign: "center",
                                        }}
                                    >
                                        {page.title}
                                    </h2>
                                )}
                            </LinkOrA>
                            <div
                                css={{
                                    display: "flex",
                                    flexDirection: isWide ? "row" : "column",
                                    marginTop: 25,
                                }}
                            >
                                {page.imgPath && (
                                    <LinkOrA
                                        href={`${url}/${page.url}`}
                                        pCss={c.articleLink}
                                    >
                                        <img
                                            alt={page.title}
                                            src={page.imgPath}
                                            css={[
                                                c.imgContainer,
                                                {
                                                    width: isWide
                                                        ? "100%"
                                                        : screenWidth - 155,
                                                    maxHeight: isWide
                                                        ? 150
                                                        : undefined,
                                                },
                                            ]}
                                        />
                                    </LinkOrA>
                                )}
                                <div css={c.articleDesc}>
                                    <p
                                        css={{
                                            margin: isWide
                                                ? "0 20px 10px 20px"
                                                : "10px 0 0",
                                            fontSize: isWide
                                                ? undefined
                                                : "medium",
                                        }}
                                    >
                                        {page.description}
                                    </p>
                                </div>
                            </div>
                        </ScrollBox>
                    </article>
                ))
            ) : (
                <ShurikenProgress size="20%" />
            )}
        </>
    );
}

const c = getClasses({
    article: {
        marginBottom: 45,
        textAlign: "left",
        maxWidth: 900,
    },
    articleDesc: {
        margin: 0,
        display: "flex",
        alignItems: "center",
        flex: 2,
    },
    imgContainer: {
        objectFit: "cover",
        margin: 0,
    },
    articleLink: {
        display: "block",
        flex: 1,
    },
});
