import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";
import { Css } from "../../../lib/css";

interface AutoHeightProps extends ImageProps {
    maxHeight?: number;
    containerStyle?: SerializedStyles | Css;
}

export const Img = NextImage;

export function AutoHeightImg({
    maxHeight,
    width,
    containerStyle,
    ...rest
}: AutoHeightProps) {
    return (
        <div
            css={[
                {
                    width: width,
                    "& img": {
                        maxHeight: maxHeight
                            ? `${maxHeight}px !important`
                            : undefined,
                    },
                },
                containerStyle,
                parentRelative,
            ]}
        >
            <NextImage
                layout="fill"
                objectFit="contain"
                {...rest}
                css={autoHeightImgStyle}
            />
        </div>
    );
}

const autoHeightImgStyle = css`
    height: unset !important;
    position: relative !important;
`;
const parentRelative = css`
    position: relative;
    & > div {
        position: relative !important;
        width: 100%;
        height: 100%;
    }
`;
