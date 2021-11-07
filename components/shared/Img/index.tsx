import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";

interface Props extends ImageProps {
    pCss?: SerializedStyles;
}

export function Img({ pCss, ...rest }: Props) {
    if (pCss) {
        return (
            <div
                css={css`
                    display: inline-block;
                    ${pCss}
                `}
            >
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
