import { css, SerializedStyles } from "@emotion/react";
import * as React from "react";
import { appsPublicImg } from "../../../const/public";
import { getClasses } from "../../../lib/css";

const shuriken = appsPublicImg + "shuriken.png";

interface Props {
    size?: string | number;
    style?: SerializedStyles;
}
export default function ShurikenProgress({ size, style }: Props) {
    return (
        <div css={[c.container, style]}>
            <img
                src={shuriken}
                alt="shuriken"
                css={[{ width: size, height: size }, c.shuriken]}
            />
        </div>
    );
}

const c = getClasses({
    container: css`
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: auto;
        margin-left: auto;
    `,
    shuriken: css`
        object-fit: "contain";
        object-position: "50% 50%";
        animation: shurikenProgress 1s infinite;
        @keyframes shurikenProgress {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `,
});
