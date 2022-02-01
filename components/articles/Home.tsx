import React, { useEffect, useState } from "react";
import { getClasses } from "../../lib/css";
import { useScreenSize } from "../../lib/screenSize";
import { Page } from "../../pages/articles/[[...path]]";
import { Layout, whiteShadowStyle } from "./Layout";
import { HelmetProps } from "../shared/Helmet";
import CharacterComment from "../shared/CharacterComment";
import { ArticlesList } from "./ArticlesList";
import { Author, AuthorArea } from "./Author";
import FB from "../shared/FaceBook";
import { GetArticleTopProps } from "../../pages/api/articles/getArticleTopProps";
import { sleepAsync } from "../../lib/sleep";
import { fetchGet } from "../../lib/fetch";
import { apps } from "../../const/public";

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
