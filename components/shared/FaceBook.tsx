import { SerializedStyles } from "@emotion/utils";
import * as React from "react";
import { css } from "../../lib/css";

interface Props {
    style?: SerializedStyles;
    screenWidth: number;
}
export default function FB(props: Props) {
    const { style, screenWidth } = props;

    const width = screenWidth > 350 ? 350 : 300;
    const height = 200;

    return (
        <div css={style}>
            <iframe
                title="fb"
                src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLingualNinja%2F&width=${width}&height=${height}&small_header=false&tabs=timeline$adapt_container_width=false&hide_cover=false&show_facepile=true&appId`}
                width={width}
                height={height}
                css={iFrameStyle}
                scrolling="yes"
                frameBorder="0"
                allow="encrypted-media"
            />
        </div>
    );
}

const iFrameStyle = css({ border: "none", overflow: "hidden" });
