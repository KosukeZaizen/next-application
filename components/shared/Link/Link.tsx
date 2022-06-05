import { SerializedStyles } from "@emotion/react";
import NextLink from "next/link";
import React, { AnchorHTMLAttributes } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    pCss?: SerializedStyles;
    href: string;
}

export function Link({ href, pCss, ...rest }: LinkProps) {
    return (
        <NextLink href={href}>
            <a {...rest} css={pCss} href={href} />
        </NextLink>
    );
}
