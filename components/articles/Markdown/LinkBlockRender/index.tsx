import React from "react";
import { A } from "../../../shared/Link/A";
import { ATargetBlank } from "../../../shared/Link/ATargetBlank";
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
    return (
        <A href={href} pCss={style}>
            {children}
        </A>
    );
};
