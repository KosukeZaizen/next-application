import React from "react";
import { getClasses } from "../../lib/css";
import { useScreenSize } from "../../lib/screenSize";
import { Page } from "../../pages/articles/[pageName]";
import CharacterComment from "../shared/CharacterComment";
import FB from "../shared/FaceBook";
import { ArticlesList } from "./ArticlesList";
import { Author } from "./Author";
import { Layout, getImgNumber, whiteShadowStyle } from "./Layout";
import { Helmet, HelmetProps } from "../shared/Helmet";
import { fetchZApps } from "../../lib/fetch";

export const siteName = "Articles about Japan";
const desc =
    "Articles about studying Japanese language and culture! I hope these articles help you to learn about Japan!";
export const domain = "articles.lingual-ninja.com";

const imgNumber = getImgNumber();

export interface ArticlesHomeProps {
    type: "articles";
    pages: Page[];
    helmetProps: HelmetProps;
}

export default function Home({ pages, helmetProps }: ArticlesHomeProps) {
    const { screenWidth, screenHeight } = useScreenSize();
    return (
        <Layout screenWidth={screenWidth} screenHeight={screenHeight}>
            <Helmet {...helmetProps} />
            <main css={c.main}>
                <h1 css={c.h1}>{siteName}</h1>
                <CharacterComment
                    imgNumber={imgNumber}
                    screenWidth={screenWidth}
                    comment={desc.split("! ").map((d, i, arr) => (
                        <p key={i}>{d + (i < arr.length - 1 ? "! " : "")}</p>
                    ))}
                    commentStyle={c.comment}
                />
                <div css={c.container}>
                    <ArticlesList
                        titleH={"h2"}
                        articles={pages}
                        screenWidth={screenWidth}
                    />
                    <Author style={c.author} screenWidth={screenWidth} />
                </div>
                <FB style={c.fb} screenWidth={screenWidth} />
            </main>
        </Layout>
    );
}

const c = getClasses({
    main: { maxWidth: 900, textAlign: "left" },
    h1: [
        {
            margin: "30px 0 40px",
            fontWeight: "bolder",
            textAlign: "center",
        },
        whiteShadowStyle,
    ],
    comment: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    container: { margin: "20px 0" },
    red: { color: "red" },
    author: { marginTop: 45 },
    fb: { marginTop: 20, width: "100%", textAlign: "center" },
});

export async function getArticleHomeProps(): Promise<ArticlesHomeProps> {
    const response: Response = await fetchZApps("api/Articles/GetAllArticles");
    const pages: Page[] = await response.json();
    return {
        type: "articles",
        pages,
        helmetProps: {
            title: siteName,
            desc,
            domain,
            siteName,
        },
    };
}
