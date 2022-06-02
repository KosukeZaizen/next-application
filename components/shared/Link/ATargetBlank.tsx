import { SerializedStyles } from "@emotion/react";
import React, { AnchorHTMLAttributes } from "react";
import { A } from "./LinkWithYouTube";

export function ATargetBlank({
    nofollow,
    children,
    ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
    nofollow?: boolean;
    pCss?: SerializedStyles;
}) {
    const rel = nofollow
        ? "nofollow noopener noreferrer"
        : "noopener noreferrer";

    return (
        <A target="_blank" rel={rel} {...rest}>
            {children}
        </A>
    );
}
