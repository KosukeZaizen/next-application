import React, { AnchorHTMLAttributes } from "react";
import { css } from "../../../lib/css";

export function ATargetBlank(
    props: AnchorHTMLAttributes<HTMLAnchorElement> & {
        nofollow?: boolean;
    }
) {
    const { nofollow, children, style, ...rest } = props;

    const rel = nofollow
        ? "nofollow noopener noreferrer"
        : "noopener noreferrer";

    return (
        <a target="_blank" rel={rel} {...rest} css={css({ ...style })}>
            {children}
        </a>
    );
}
