import * as React from "react";
import { Page } from "../../pages/articles/[pageName]";
import { AutoHeightImg } from "../shared/Img";
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
                    <article
                        key={page.title}
                        style={{
                            marginBottom: 45,
                            textAlign: "left",
                            maxWidth: 900,
                        }}
                    >
                        <ScrollBox>
                            <LinkOrA href={`${url}/${page.url}`}>
                                {titleH === "h3" ? (
                                    <h3
                                        style={{
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
                                        style={{
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
                                style={{
                                    display: "flex",
                                    flexDirection: isWide ? "row" : "column",
                                    marginTop: 25,
                                }}
                            >
                                {page.imgPath && (
                                    <LinkOrA
                                        href={`${url}/${page.url}`}
                                        style={{
                                            display: "inline-block",
                                            flex: 1,
                                            position: "relative",
                                        }}
                                    >
                                        <AutoHeightImg
                                            alt={page.title}
                                            src={page.imgPath}
                                            maxHeight={150}
                                            objectFit={"cover"}
                                            containerStyle={{
                                                width: "100%",
                                                margin: 0,
                                            }}
                                        />
                                    </LinkOrA>
                                )}
                                <div
                                    style={{
                                        margin: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        flex: 2,
                                    }}
                                >
                                    <p
                                        style={{
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
