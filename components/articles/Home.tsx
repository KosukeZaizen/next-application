import React, { useEffect, useState } from "react";
import { getClasses } from "../../lib/css";
import { useScreenSize } from "../../lib/hooks/useScreenSize";
import { Layout, whiteShadowStyle } from "./Layout";
import { HelmetProps } from "../shared/Helmet";
import CharacterComment from "../shared/CharacterComment";
import { ArticlesList } from "./ArticlesList";
import { Author, AuthorArea } from "./Author";
import FB from "../shared/FaceBook";
import { GetArticleTopProps } from "../../pages/api/articles/getArticleTopProps";
import { sleepAsync } from "../../lib/sleep";
import { fetchGet } from "../../lib/fetch";
import { apps, Z_APPS_TOP_URL } from "../../const/public";
import { Page } from "./Articles";

export const siteName = "Articles about Japan";
export const desc =
    "Articles about studying Japanese language and culture! I hope these articles help you to learn about Japan!";
export const domain = apps.articles.host;

const imgNumber = 1;

export interface Props {
    pageType: "home";
    pages: Page[];
    allAuthors: Author[];
    helmetProps: HelmetProps;
}

export default function Home(props: Props) {
    const { screenWidth, screenHeight } = useScreenSize();
    const { pages, allAuthors, helmetProps } = useRevisedProps(props);

    return (
        <Layout
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            helmetProps={helmetProps}
            maxWidth={maxWidth}
        >
            <main css={c.main}>
                <BreadCrumbs />
                <h1
                    css={[
                        c.h1,
                        {
                            margin:
                                screenWidth > 600 ? "40px 0" : "30px 0 40px",
                        },
                    ]}
                >
                    {siteName}
                </h1>
                <CharacterComment
                    imgNumber={imgNumber}
                    screenWidth={screenWidth}
                    comment={
                        <div css={c.characterComment}>
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
                        allAuthors={allAuthors}
                    />
                    <AuthorArea
                        style={c.author}
                        screenWidth={screenWidth}
                        author={allAuthors.find(a => a.authorId === 1)}
                    />
                </div>
                <FB style={c.fb} screenWidth={screenWidth} />
            </main>
        </Layout>
    );
}

function BreadCrumbs() {
    return (
        <div css={whiteShadowStyle}>
            <a href={Z_APPS_TOP_URL}>Home</a>
            <span css={c.breadArrow}>{" > "}</span>
            <span>Articles</span>
        </div>
    );
}

function useRevisedProps(props: Props) {
    const [_props, setProps] = useState<Props>(props);

    useEffect(() => {
        (async () => {
            await sleepAsync(200);
            const result = await fetchGet<GetArticleTopProps>(
                "/api/articles/getArticleTopProps",
                {}
            );
            if (result.responseType === "success") {
                setProps(result);
            }
        })();
    }, []);

    return _props;
}

const maxWidth = 900;

const c = getClasses({
    main: { maxWidth, textAlign: "left" },
    h1: [
        {
            fontWeight: "bolder",
            textAlign: "center",
        },
        whiteShadowStyle,
    ],
    comment: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    characterComment: { textAlign: "left" },
    container: { margin: "20px 0" },
    red: { color: "red" },
    author: { marginTop: 45 },
    fb: { marginTop: 20, width: "100%", textAlign: "center" },
    breadArrow: { marginLeft: 5, marginRight: 5 },
});
