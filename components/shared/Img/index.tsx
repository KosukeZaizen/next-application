import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";
import { Css } from "../../../lib/css";

type AutoHeightProps = SlowImgProps | NoTimeImgProps;

interface SlowImgProps extends Omit<ImageProps, "loading"> {
    maxHeight?: number;
    containerStyle?: SerializedStyles | Css;
    loading?: ImageProps["loading"];
}

interface NoTimeImgProps extends Omit<ImageProps, "loading" | "src" | "alt"> {
    containerStyle?: SerializedStyles | Css;
    loading: "noTime";
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

export function AutoHeightImg(props: AutoHeightProps) {
    if (props.loading === "noTime") {
        const { containerStyle, alt, loading: _loading, ...rest } = props;
        return <img alt={alt} {...rest} css={containerStyle} />;
    }

    const { maxHeight, width, containerStyle, alt, ...rest } = props;
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
