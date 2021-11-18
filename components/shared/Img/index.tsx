import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";
import { Css } from "../../../lib/css";

interface AutoHeightProps extends ImageProps {
    maxHeight?: number;
    containerStyle?: SerializedStyles | Css;
}

export const Img = (props: ImageProps) => (
    <NextImage loading="eager" {...props} />
);

export function CenterImg(props: ImageProps) {
    return (
        <Img
            layout="responsive"
            width="100%"
            height="100%"
            objectFit="contain"
            objectPosition="50% 50%"
            {...props}
        />
    );
}

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
                loading="eager"
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
