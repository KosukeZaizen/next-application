import * as React from "react";
import LazyLoad from "react-lazyload";
import { css, getClasses } from "../../lib/css";
import { Page } from "../../pages/articles/[pageName]";
import { LinkOrA } from "../shared/Link/LinkOrA";
import { ScrollBox } from "../shared/ScrollBox";
import ShurikenProgress from "../shared/ShurikenProgress";
import { Author, AuthorCard } from "./Author";

interface ArticlesListProps {
    articles: Page[];
    screenWidth: number;
    titleH: "h2" | "h3";
    isTargetBlank?: boolean;
    allAuthors: Author[];
}
export function ArticlesList({
    articles,
    screenWidth,
    titleH,
    isTargetBlank,
    allAuthors,
}: ArticlesListProps) {
    const isWide = screenWidth > 767;

    const url = isTargetBlank
        ? "https://articles.lingual-ninja.com/articles"
        : "/articles";

    const imgSize = isWide
        ? {
              width: "100%",
              height: "100%",
          }
        : { width: "100%" };

    return (
        <>
            {articles.length > 0 ? (
                articles.map((page, i) => {
                    const image = (
                        <img
                            alt={page.title}
                            src={page.imgPath}
                            css={[
                                {
                                    objectFit: "cover",
                                    objectPosition: "50% 50%",
                                    margin: 0,
                                },
                                imgSize,
                            ]}
                        />
                    );
                    const isImageLazy = i > 10 || titleH === "h3";

                    return (
                        <article key={page.title} css={c.article}>
                            <ScrollBox
                                pCss={
                                    isWide
                                        ? css({ padding: 15 })
                                        : css({ padding: 10 })
                                }
                            >
                                <div
                                    css={{
                                        display: "flex",
                                        flexDirection: isWide
                                            ? "row"
                                            : "column",
                                    }}
                                >
                                    {page.imgPath && (
                                        <LinkOrA
                                            href={`${url}/${page.url}`}
                                            pCss={c.articleLink}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    overflow: "hidden",
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                            >
                                                {isImageLazy ? (
                                                    <LazyLoad>{image}</LazyLoad>
                                                ) : (
                                                    image
                                                )}
                                            </div>
                                        </LinkOrA>
                                    )}
                                    <div
                                        css={[
                                            c.articleDesc,
                                            {
                                                margin: isWide
                                                    ? "0 0 10px 20px"
                                                    : "10px 5px",
                                                alignItems: isWide
                                                    ? "flex-end"
                                                    : "flex-start",
                                            },
                                        ]}
                                    >
                                        <div>
                                            <LinkOrA
                                                href={`${url}/${page.url}`}
                                            >
                                                {titleH === "h3" ? (
                                                    <h3
                                                        css={{
                                                            fontSize: isWide
                                                                ? "27px"
                                                                : "x-large",
                                                        }}
                                                    >
                                                        {page.title}
                                                    </h3>
                                                ) : (
                                                    <h2
                                                        css={{
                                                            fontSize: isWide
                                                                ? "27px"
                                                                : "x-large",
                                                        }}
                                                    >
                                                        {page.title}
                                                    </h2>
                                                )}
                                            </LinkOrA>
                                            <p
                                                css={{
                                                    fontSize: isWide
                                                        ? undefined
                                                        : "medium",
                                                    margin: 0,
                                                }}
                                            >
                                                {page.description.length > 200
                                                    ? page.description.slice(
                                                          0,
                                                          200
                                                      ) + "..."
                                                    : page.description}
                                            </p>
                                        </div>
                                        <div
                                            css={{
                                                position: "relative",
                                                top: 10,
                                                left: isWide ? 0 : -5,
                                            }}
                                        >
                                            <AuthorCard
                                                author={allAuthors.find(
                                                    a =>
                                                        a.authorId ===
                                                        page.authorId
                                                )}
                                                screenWidth={screenWidth}
                                                style={{ borderRadius: 0 }}
                                                iconLazy={isImageLazy}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ScrollBox>
                        </article>
                    );
                })
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
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    articleLink: {
        flex: 1,
        maxHeight: 250,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
    },
});
