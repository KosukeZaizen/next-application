import { css, SerializedStyles } from "@emotion/react";
import * as React from "react";
import { BLOB_URL } from "../../../const/public";
import { getClasses } from "../../../lib/css";
import { AutoHeightImg } from "../Img";

import styles from "./CharacterComment.module.css";

type TProps = {
    imgNumber: number;
    screenWidth: number;
    comment: string | React.ReactNode;
    css?: SerializedStyles;
    commentStyle?: SerializedStyles;
    imgStyle?: SerializedStyles;
    containerRef?: React.RefObject<HTMLDivElement>;
};
export default function CharacterComment(props: TProps) {
    const {
        imgNumber,
        screenWidth,
        comment,
        css: pCss,
        commentStyle,
        imgStyle,
        containerRef,
    } = props;
    return (
        <div css={[classes.container, pCss]} ref={containerRef}>
            <div css={classes.flex1}>
                <AutoHeightImg
                    src={`${BLOB_URL}/vocabulary-quiz/img/ninja${imgNumber}.png`}
                    alt="Japanese ninja"
                    containerStyle={css([
                        {
                            width: (screenWidth * 2) / 10,
                            maxWidth: 120,
                            height: "auto",
                            verticalAlign: "top",
                        },
                        imgStyle,
                        animationStyle,
                    ])}
                />
            </div>
            <div className={styles.chatting} css={classes.chatting}>
                <div
                    className={styles.says}
                    css={{
                        width:
                            screenWidth > 767
                                ? (screenWidth * 7) / 10 - 15
                                : "100%",
                        maxWidth: 420,
                        ...commentStyle,
                    }}
                >
                    {comment}
                </div>
            </div>
        </div>
    );
}

const animationStyle = css`
    animation: ninjaCommentAnime 10s linear infinite;
    animation-delay: 1s;
    @keyframes ninjaCommentAnime {
        0% {
            transform: translate3d(0px, 0px, 0px);
        }
        2% {
            transform: translate3d(0px, -10px, 0px);
        }
        5% {
            transform: translate3d(0px, 0px, 0px);
        }
        7% {
            transform: translate3d(0px, -10px, 0px);
        }
        10% {
            transform: translate3d(0px, 0px, 0px);
        }
        100% {
            transform: translate3d(0px, 0px, 0px);
        }
    }
`;

const classes = getClasses({
    container: {
        display: "flex",
        maxWidth: 600,
        margin: "auto",
    },
    flex1: { flex: 1 },
    chatting: {
        height: "auto",
        display: "flex",
        alignItems: "center",
        flex: 3,
    },
});
