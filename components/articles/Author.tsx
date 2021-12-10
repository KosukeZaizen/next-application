import { SerializedStyles } from "@emotion/utils";
import * as React from "react";
import { CSSProperties, useState } from "react";
import { css } from "../../lib/css";
import { AutoHeightImg, Img } from "../shared/Img";
import { ScrollBox } from "../shared/ScrollBox";
import { Markdown } from "./Markdown";
import { getClasses } from "../../lib/css";
import classes from "../shared/CharacterComment/CharacterComment.module.css";
import { ARTICLES_BLOB } from "../../const/public";
import { Avatar, Card } from "@material-ui/core";
import { RightPanel } from "../shared/RightPanel";

export interface Author {
    authorId: number;
    authorName: string;
    initialGreeting: string;
    selfIntroduction: string;
    isAdmin: boolean;
    imgExtension: string;
}

function getAuthorImgPath({ authorId, imgExtension }: Author) {
    return `${ARTICLES_BLOB}/_authors/${authorId}${imgExtension}`;
}

export function AuthorCard({
    author,
    screenWidth,
}: {
    author?: Author;
    screenWidth: number;
}) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    if (!author) {
        return null;
    }

    const panelWidth = screenWidth > 1000 ? 1000 : screenWidth;

    return (
        <>
            <Card
                css={{
                    display: "flex",
                    alignItems: "center",
                    padding: 5,
                    cursor: "pointer",
                }}
                style={{ borderRadius: 0 }}
                onClick={() => {
                    setIsPanelOpen(true);
                }}
            >
                <Avatar>
                    <Img
                        src={getAuthorImgPath(author)}
                        width={40}
                        height={40}
                        objectFit="cover"
                        objectPosition="50% 50%"
                        alt={author.authorName}
                    />
                </Avatar>
                <div css={{ marginLeft: 5, marginRight: 5 }}>
                    <span css={{ color: "#0d6efd" }}>
                        {"by "}
                        {author.authorName}
                    </span>
                </div>
            </Card>
            <RightPanel
                open={isPanelOpen}
                onClose={() => {
                    setIsPanelOpen(false);
                }}
            >
                <AuthorArea author={author} screenWidth={panelWidth} />
            </RightPanel>
        </>
    );
}

type AuthorAreaProps = {
    screenWidth: number;
    style?: SerializedStyles;
    author?: Author;
};
export const AuthorArea = ({ style, screenWidth, author }: AuthorAreaProps) => {
    if (!author) {
        return null;
    }

    const isCommentUsed = screenWidth > 767;
    const isVeryNarrow = screenWidth < 500;

    const { authorName, initialGreeting, selfIntroduction } = author;

    const imagePath = getAuthorImgPath(author);

    return (
        <ScrollBox pCss={css([c.scroll, style])}>
            <h2 css={c.commentH2}>{"Author"}</h2>
            {isCommentUsed ? (
                <PersonComment
                    imagePath={imagePath}
                    authorName={authorName}
                    comment={
                        <div>
                            <div css={c.commentContainer}>
                                {initialGreeting}
                            </div>
                            <div css={c.margin10}>
                                <CommentMarkDown
                                    selfIntroduction={selfIntroduction}
                                />
                            </div>
                        </div>
                    }
                />
            ) : (
                <div>
                    <div css={c.imgContainer}>
                        <AutoHeightImg
                            src={imagePath}
                            alt={authorName}
                            title={authorName}
                            containerStyle={c.img}
                            loading="noTime"
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
                            {initialGreeting}
                        </div>
                        <CommentMarkDown
                            style={{
                                margin: isVeryNarrow ? "5px 0" : 5,
                                fontSize: isVeryNarrow ? "medium" : undefined,
                            }}
                            selfIntroduction={selfIntroduction}
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
    imagePath: string;
    authorName: string;
};
export function PersonComment({
    comment,
    style,
    commentStyle,
    imagePath,
    authorName,
}: CommentProps) {
    return (
        <div
            css={{
                display: "flex",
                ...style,
            }}
        >
            <div css={c.personContainer}>
                <img
                    src={imagePath}
                    alt={authorName}
                    title={authorName}
                    css={c.pcImg}
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

const CommentMarkDown = ({
    style,
    selfIntroduction,
}: {
    style?: CSSProperties;
    selfIntroduction: string;
}) => (
    <Markdown
        style={{ margin: 5, textAlign: "left", fontSize: "large", ...style }}
        source={selfIntroduction}
    />
);

const c = getClasses({
    width100: { width: "100%" },
    personContainer: { flex: 1, marginTop: 6, marginRight: 10 },
    img: {
        width: "100%",
        objectFit: "contain",
        margin: "auto",
    },
    pcImg: {
        width: "100%",
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
