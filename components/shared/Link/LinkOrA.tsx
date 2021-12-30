import { SerializedStyles } from "@emotion/react";
import React, { AnchorHTMLAttributes } from "react";
import { ATargetBlank } from "./ATargetBlank";
import { Link } from "./Link";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    pCss?: SerializedStyles;
    href: string;
}

export function LinkOrA(props: Props) {
    if (!props.href) {
        return null;
    }

    if (props.href.startsWith("https://")) {
        return <ATargetBlank {...props} pCss={props.pCss} href={props.href} />;
    }
    return <Link {...props} />;
}
