import React from "react";
import { getClasses } from "../../lib/css";
import { useScreenSize } from "../../lib/screenSize";
import { Page } from "./[pageName]";
import { fetchZAppsFromServerSide } from "../../lib/fetch";
import {
    getImgNumber,
    Layout,
    whiteShadowStyle,
} from "../../components/articles/Layout";
import { HelmetProps } from "../../components/shared/Helmet";
import CharacterComment from "../../components/shared/CharacterComment";
import { ArticlesList } from "../../components/articles/ArticlesList";
import { Author } from "../../components/articles/Author";
import FB from "../../components/shared/FaceBook";
import { GetStaticProps } from "next";

export const siteName = "Articles about Japan";
const desc =
    "Articles about studying Japanese language and culture! I hope these articles help you to learn about Japan!";
export const domain = "articles.lingual-ninja.com";

const imgNumber = getImgNumber();

export interface Props {
    pages: Page[];
    helmetProps: HelmetProps;
}

export default function Home({ pages, helmetProps }: Props) {
    const { screenWidth, screenHeight } = useScreenSize();

    return (
        <Layout
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            helmetProps={helmetProps}
        >
            <main css={c.main}>
                <h1 css={c.h1}>{siteName}</h1>
                <CharacterComment
                    imgNumber={imgNumber}
                    screenWidth={screenWidth}
                    comment={
                        <div css={{ textAlign: "left" }}>
                            {desc.split("! ").map((d, i, arr) => (
                                <p key={i}>
                                    {d + (i < arr.length - 1 ? "! " : "")}
                                </p>
                            ))}
                        </div>
                    }
                    commentStyle={c.comment}
                    loading="noTime"
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

export const getStaticProps: GetStaticProps<Props> = async () => {
    try {
        const response: Response = await fetchZAppsFromServerSide(
            "api/Articles/GetAllArticles"
        );
        const pages: Page[] = await response.json();
        return {
            props: {
                pages,
                helmetProps: {
                    title: siteName,
                    desc,
                    domain,
                    siteName,
                },
            },
            revalidate: 1,
        };
    } catch {
        return { notFound: true, revalidate: 1 };
    }
};
