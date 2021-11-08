import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";

interface Props extends ImageProps {
    style?: SerializedStyles;
    containerClassName?: string;
}

export function Img({ style, ...rest }: Props) {
    if (style) {
        return (
            <div css={[inlineStyle, style]}>
                <NextImage
                    layout="responsive"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    objectPosition="top left"
                    {...rest}
                />
            </div>
        );
    }
    return <NextImage {...rest} />;
}

const inlineStyle = css({ display: "inline" });
