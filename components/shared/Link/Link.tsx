import { SerializedStyles } from "@emotion/react";
import NextLink from "next/link";
import React, { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    pCss?: SerializedStyles;
    href: string;
}

export function Link({ href, pCss, ...rest }: Props) {
    return (
        <NextLink href={href}>
            <a {...rest} css={pCss} href={href} />
        </NextLink>
    );
}
