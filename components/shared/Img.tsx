import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";

interface Props extends ImageProps {
    containerStyle?: SerializedStyles;
    containerClassName?: string;
}

export function Img({ containerStyle, ...rest }: Props) {
    const img = <NextImage layout="fill" objectFit="contain" {...rest} />;
    if (containerStyle) {
        return <div css={[inlineStyle, containerStyle]}>{img}</div>;
    }
    return img;
}

const inlineStyle = css({ position: "relative" });
