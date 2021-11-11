import { SerializedStyles } from "@emotion/react";
import React, { AnchorHTMLAttributes } from "react";

export function ATargetBlank(
    props: AnchorHTMLAttributes<HTMLAnchorElement> & {
        nofollow?: boolean;
        pCss?: SerializedStyles;
    }
) {
    const { nofollow, children, pCss, ...rest } = props;

    const rel = nofollow
        ? "nofollow noopener noreferrer"
        : "noopener noreferrer";

    return (
        <a target="_blank" rel={rel} {...rest} css={pCss}>
            {children}
        </a>
    );
}
