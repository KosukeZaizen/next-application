import { SerializedStyles } from "@emotion/utils";
import React from "react";
import styles from "./style.module.css";

interface Props {
    pCss?: SerializedStyles;
    children: React.ReactNode;
}
export const ScrollBox = (props: Props) => {
    const { children, pCss } = props;
    return (
        <div css={pCss} className={styles["style-scroll"]}>
            {children}
        </div>
    );
};
