import { css, SerializedStyles } from "@emotion/react";
import * as React from "react";
import { appsPublicImg } from "../../../const/public";
import { centerStyle } from "../../articles/Layout";
import { Img } from "../Img";

const shuriken = appsPublicImg + "shuriken.png";

interface Props {
    size?: string | number;
    style?: SerializedStyles;
}
export default function ShurikenProgress({ size, style }: Props) {
    return (
        <div css={[style, centerStyle, shurikenAnime]}>
            <Img
                src={shuriken}
                alt="shuriken"
                layout="fixed"
                width={size}
                height={size}
                loading="eager"
            />
        </div>
    );
}

const shurikenAnime = css`
    animation: shurikenProgress 1s infinite;
    @keyframes shurikenProgress {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
