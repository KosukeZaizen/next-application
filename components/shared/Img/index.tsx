import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";
import { Css } from "../../../lib/css";

interface AutoHeightProps extends Omit<ImageProps, "loading" | "src" | "alt"> {
    maxHeight?: number;
    containerStyle?: SerializedStyles | Css;
    loading?: ImageProps["loading"] | "noTime";
    src: string;
    alt: string;
}

export const Img = NextImage;

export function CenterImg(props: ImageProps) {
    return (
        <Img
            layout="responsive"
            width="100%"
            height="100%"
            objectFit="contain"
            objectPosition="50% 50%"
            loading="eager"
            {...props}
        />
    );
}

export function AutoHeightImg({
    maxHeight,
    width,
    containerStyle,
    loading,
    alt,
    ...rest
}: AutoHeightProps) {
    if (loading === "noTime") {
        return <img alt={alt} {...rest} />;
    }

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
                loading={loading || "eager"}
                alt={alt}
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
