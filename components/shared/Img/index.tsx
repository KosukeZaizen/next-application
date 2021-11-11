import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";
import { Css } from "../../../lib/css";

type Props = NormalImgProps | AutoHeightProps;

interface NormalImgProps extends ImageProps {
    containerStyle?: SerializedStyles | Css;
}
interface AutoHeightProps extends ImageProps {
    maxHeight?: number;
    containerStyle?: SerializedStyles | Css;
}

export function Img(props: Props) {
    const { containerStyle, ...rest } = props;
    if (containerStyle) {
        return (
            <div css={[containerStyle, parentRelative]}>
                <NextImage layout="fill" objectFit="contain" {...rest} />
            </div>
        );
    }

    return <NextImage layout="fill" objectFit="contain" {...rest} />;
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
    & > div {
        position: relative !important;
    }
`;
