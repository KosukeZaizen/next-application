import { SerializedStyles } from "@emotion/react";
import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";
import { ATargetBlank } from "./ATargetBlank";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    pCss?: SerializedStyles;
}

export function LinkOrA(props: Props) {
    const { href, pCss, ...rest } = props;
    if (!href) {
        return null;
    }

    if (href.startsWith("https://")) {
        return <ATargetBlank {...props} pCss={pCss} />;
    }
    return (
        <Link href={href}>
            <a {...rest} css={pCss} />
        </Link>
    );
}
