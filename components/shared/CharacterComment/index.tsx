import { SerializedStyles } from "@emotion/react";
import * as React from "react";
import { BLOB_URL } from "../../../const/public";
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
        css,
        commentStyle,
        imgStyle,
        containerRef,
    } = props;
    return (
        <div
            css={{
                display: "flex",
                maxWidth: 600,
                margin: "auto",
                ...css,
            }}
            ref={containerRef}
        >
            <div style={{ flex: 1 }}>
                <img
                    src={`${BLOB_URL}/vocabulary-quiz/img/ninja${imgNumber}.png`}
                    alt="Japanese ninja"
                    css={{
                        width: (screenWidth * 2) / 10,
                        maxWidth: 120,
                        height: "auto",
                        verticalAlign: "top",
                        ...imgStyle,
                    }}
                    className={styles.ninjaPic}
                />
            </div>
            <div
                className={styles.chatting}
                css={{
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    flex: 3,
                }}
            >
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
