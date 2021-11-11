import { css } from "@emotion/react";
import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";
import { ATargetBlank } from "./ATargetBlank";

export function LinkOrA(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { href, style, ...rest } = props;
    if (!href) {
        return null;
    }

    if (href.startsWith("https://")) {
        return <ATargetBlank {...props} style={style} />;
    }
    return (
        <Link href={href}>
            <a {...rest} css={css({ ...style })} />
        </Link>
    );
}
