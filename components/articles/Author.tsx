import { SerializedStyles } from "@emotion/utils";
import * as React from "react";
import { CSSProperties } from "react";
import { appsPublicImg } from "../../const/public";
import { css } from "../../lib/css";
import { AutoHeightImg } from "../shared/Img";
import { ScrollBox } from "../shared/ScrollBox";
import { Markdown } from "./Markdown";
import { getClasses } from "../../lib/css";
import classes from "../shared/CharacterComment/CharacterComment.module.css";
import { A } from "../shared/Link/A";

const image = appsPublicImg + "KosukeZaizen.jpg";

type AuthorProps = {
    screenWidth: number;
    style?: SerializedStyles;
    isLink?: boolean;
};
export const Author = ({ style, screenWidth, isLink }: AuthorProps) => {
    const isCommentUsed = screenWidth > 767;
    const isVeryNarrow = screenWidth < 500;
    const author = isLink ? <A href="/developer">Author</A> : "Author";

    return (
        <ScrollBox pCss={css([c.scroll, style])}>
            <h2 css={c.commentH2}>{author}</h2>
            {isCommentUsed ? (
                <PersonComment
                    comment={
                        <div>
                            <div css={c.commentContainer}>
                                {"I'm Kosuke Zaizen!"}
                            </div>
                            <div css={c.margin10}>
                                <CommentMarkDown />
                            </div>
                        </div>
                    }
                />
            ) : (
                <div>
                    <div css={c.imgContainer}>
                        <AutoHeightImg
                            src={image}
                            alt="Kosuke Zaizen"
                            title="Kosuke Zaizen"
                            containerStyle={c.img}
                        />
                    </div>
                    <div
                        css={{
                            margin: isVeryNarrow ? "10px 0" : 10,
                            fontSize: "large",
                            textAlign: "left",
                            padding: isVeryNarrow ? 0 : 10,
                        }}
                    >
                        <div
                            css={{
                                fontWeight: "bold",
                                fontSize: "x-large",
                                margin: isVeryNarrow
                                    ? "0 0 25px"
                                    : "0 5px 25px",
                            }}
                        >
                            {"I'm Kosuke Zaizen!"}
                        </div>
                        <CommentMarkDown
                            style={{
                                margin: isVeryNarrow ? "5px 0" : 5,
                                fontSize: isVeryNarrow ? "medium" : undefined,
                            }}
                        />
                    </div>
                </div>
            )}
        </ScrollBox>
    );
};

type CommentProps = {
    comment: string | React.ReactNode;
    style?: React.CSSProperties;
    commentStyle?: SerializedStyles;
};
export function PersonComment(props: CommentProps) {
    const { comment, style, commentStyle } = props;
    return (
        <div
            css={{
                display: "flex",
                ...style,
            }}
        >
            <div css={c.personContainer}>
                <AutoHeightImg
                    src={image}
                    alt="Kosuke Zaizen"
                    title="Kosuke Zaizen"
                    containerStyle={c.pcImg}
                />
            </div>
            <div css={c.chatting}>
                <div className={classes.says} css={[c.width100, commentStyle]}>
                    {comment}
                </div>
            </div>
        </div>
    );
}

const CommentMarkDown = ({ style }: { style?: CSSProperties }) => (
    <Markdown
        style={{ margin: 5, textAlign: "left", fontSize: "large", ...style }}
        source={`
Thank you for visiting my website!

I am a Japanese programmer named Kosuke Zaizen.
I like to make free web applications for Japanese learners.
I know that learning Japanese can be difficult.
I think the most important thing in learning a new language 
is to **have fun** and to **continue**.
I would like you to enjoy studying Japanese by using my web application.

I hope this website helps you to study Japanese!
`}
    />
);

const c = getClasses({
    width100: { width: "100%" },
    personContainer: { flex: 1, marginTop: 6, marginRight: 10 },
    img: {
        width: "100%",
        maxWidth: 300,
        objectFit: "contain",
        margin: "auto",
    },
    pcImg: {
        maxWidth: 300,
        verticalAlign: "top",
    },
    imgContainer: { margin: "0 auto 20px" },
    margin10: { margin: 10 },
    scroll: { textAlign: "center" },
    commentH2: { marginBottom: 25 },
    chatting: {
        height: "auto",
        display: "flex",
        alignItems: "center",
        flex: 1,
    },
    commentContainer: {
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "x-large",
        margin: "15px 5px 25px",
    },
});
