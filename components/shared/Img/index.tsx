import { css, SerializedStyles } from "@emotion/react";
import NextImage, { ImageProps } from "next/image";
import React from "react";

type Props = NormalImgProps | AutoHeightProps;

interface NormalImgProps extends ImageProps {
    containerStyle?: SerializedStyles;
}
interface AutoHeightProps extends ImageProps {
    autoHeight: true;
    maxHeight?: number;
    containerStyle?: SerializedStyles;
}

export function Img(props: Props) {
    if ("autoHeight" in props) {
        return <AutoHeightImg {...props} />;
    }

    const { containerStyle, ...rest } = props;
    if (containerStyle) {
        return (
            <div css={[inlineStyle, containerStyle]}>
                <NextImage layout="fill" objectFit="contain" {...rest} />
            </div>
        );
    }

    return <NextImage layout="fill" objectFit="contain" {...rest} />;
}

function AutoHeightImg(props: AutoHeightProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { autoHeight, maxHeight, width, containerStyle, ...rest } = props;
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
                css`
                    & > div {
                        position: unset !important;
                    }
                `,
                containerStyle,
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

const inlineStyle = css({ position: "relative" });
const autoHeightImgStyle = css`
    height: unset !important;
    position: relative !important;
`;
