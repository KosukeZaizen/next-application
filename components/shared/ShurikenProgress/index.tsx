import { css, CSSObject } from "@emotion/react";
import * as React from "react";
import { appsPublicImg } from "../../../const/public";
import { centerStyle } from "../../../pages/articles/[pageName]";

const shuriken = appsPublicImg + "shuriken.png";

interface Props {
    size?: string;
    style?: CSSObject;
}
export default function ShurikenProgress({ size, style }: Props) {
    return (
        <div
            css={{
                ...style,
                ...css`
                    ${centerStyle}
                `,
            }}
        >
            {/* This image should not be lazy loaded */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={shuriken}
                alt="shuriken"
                css={css`
                    width: ${size};
                    height: ${size};
                    animation: shurikenProgress 1s infinite;
                    @keyframes shurikenProgress {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}
            />
        </div>
    );
}
