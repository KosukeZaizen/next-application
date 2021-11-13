import { SerializedStyles } from "@emotion/utils";
import Link from "next/link";
import React, { DetailedHTMLProps } from "react";

interface Props
    extends Omit<
        DetailedHTMLProps<
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
            HTMLAnchorElement
        >,
        "href"
    > {
    pCss?: SerializedStyles;
    href: string;
}

export function A({ href, pCss, onClick, ...rest }: Props) {
    return (
        <Link href={href}>
            {/* Add <a href> for crawlers */}
            <a
                href={href}
                css={pCss}
                {...rest}
                onClick={(...args) => {
                    args[0].stopPropagation();
                    if (typeof onClick === "function") {
                        onClick(...args);
                    }
                }}
            />
        </Link>
    );
}
