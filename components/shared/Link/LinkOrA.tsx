import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";
import { ATargetBlank } from "./ATargetBlank";

export function LinkOrA(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { href, ...rest } = props;
    if (!href) {
        return null;
    }

    if (href.startsWith("https://")) {
        return <ATargetBlank {...props} />;
    }
    return (
        <Link href={href}>
            <a {...rest} />
        </Link>
    );
}
