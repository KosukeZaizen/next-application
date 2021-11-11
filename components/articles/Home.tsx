import Head from "next/head";
import Link from "next/link";
import React from "react";
import { getClasses } from "../../lib/css";
import { useScreenSize } from "../../lib/screenSize";
import { Page } from "../../pages/articles/[pageName]";
import CharacterComment from "../shared/CharacterComment";
import FB from "../shared/FaceBook";
import { Helmet } from "../shared/Helmet";
import { ArticlesList } from "./ArticlesList";
import { Author } from "./Author";
import { centerStyle, getImgNumber, Layout, whiteShadowStyle } from "./Layout";

const title = "Articles about Japan";
const description =
    "Articles about studying Japanese language and culture! I hope these articles help you to learn about Japan!";
const imgNumber = getImgNumber();

export default function Home({ pages }: { pages: Page[] }) {
    const { screenWidth, screenHeight } = useScreenSize();
    return (
        <Layout screenWidth={screenWidth} screenHeight={screenHeight}>
            <Helmet title={title} desc={description} />
            <main css={c.main}>
                <h1 css={c.h1}>{title}</h1>
                <CharacterComment
                    imgNumber={imgNumber}
                    screenWidth={screenWidth}
                    comment={description.split("! ").map((d, i, arr) => (
                        <span key={i}>
                            {d + (i < arr.length - 1 ? "! " : "")}
                        </span>
                    ))}
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
    container: { margin: "20px 0" },
    red: { color: "red" },
    author: { marginTop: 45 },
    fb: { marginTop: 20, width: "100%", textAlign: "center" },
});
