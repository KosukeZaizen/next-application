import React from "react";
import { ATargetBlank } from "../../../shared/Link/ATargetBlank";
import { A, Link } from "../../../shared/Link/LinkWithYouTube";
import { linkShadowStyle } from "./linkShadowStyle";

export const LinkRender = (props: {
    href: string;
    children: React.ReactNode;
}) => <LinkRenderBase {...props} />;

export const LinkWithoutShadowRender = (props: {
    href: string;
    children: React.ReactNode;
}) => <LinkRenderBase {...props} noLinkShadow />;

const LinkRenderBase = ({
    href,
    children,
    noLinkShadow,
}: {
    href: string;
    children: React.ReactNode;
    noLinkShadow?: boolean;
}) => {
    const style = noLinkShadow ? undefined : linkShadowStyle;

    if (href.includes("https://") || href.includes("http://")) {
        return (
            <ATargetBlank href={href} css={style}>
                {children}
            </ATargetBlank>
        );
    }
    if (href.includes("#")) {
        return (
            <A href={href} pCss={style}>
                {children}
            </A>
        );
    }
    return (
        <Link href={href} pCss={style}>
            {children}
        </Link>
    );
};
