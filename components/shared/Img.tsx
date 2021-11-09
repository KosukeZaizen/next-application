import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";

interface Props extends ImageProps {
    containerStyle?: SerializedStyles;
    containerClassName?: string;
}

export function Img({ containerStyle, ...rest }: Props) {
    if (containerStyle) {
        return (
            <div css={[inlineStyle, containerStyle]}>
                <NextImage layout="fill" objectFit="contain" {...rest} />
            </div>
        );
    }
    return <NextImage {...rest} />;
}

const inlineStyle = css({ position: "relative" });
