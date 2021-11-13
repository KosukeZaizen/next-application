import { SerializedStyles } from "@emotion/react";
import React, { AnchorHTMLAttributes } from "react";
import { A } from "./A";
import { ATargetBlank } from "./ATargetBlank";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    pCss?: SerializedStyles;
}

export function LinkOrA(props: Props) {
    const { href, ...rest } = props;
    if (!href) {
        return null;
    }

    if (href.startsWith("https://")) {
        return <ATargetBlank {...props} href={href} />;
    }
    return <A href={href} {...rest} />;
}
