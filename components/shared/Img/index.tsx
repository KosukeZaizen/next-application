import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";
import styles from "./img.module.css";

interface Props extends ImageProps {
    containerStyle?: SerializedStyles;
    containerClassName?: string;
    custom?: boolean;
}

export function Img({ containerStyle, custom, ...rest }: Props) {
    const img = <NextImage layout="fill" objectFit="contain" {...rest} />;

    if (containerStyle) {
        return <div css={[inlineStyle, containerStyle]}>{img}</div>;
    }
    if (custom) {
        return (
            <div
                css={[inlineStyle, containerStyle]}
                className={styles.unsetImg}
            >
                {img}
            </div>
        );
    }
    return img;
}

const inlineStyle = css({ position: "relative" });
