import React, { ReactNode } from "react";

export function AnchorLink({
    targetHash,
    children,
}: {
    targetHash: string;
    children: ReactNode;
}) {
    const replacedHash = targetHash.replace("#", "");
    return (
        <a
            href={targetHash}
            onClick={ev => {
                ev.preventDefault();
                document.getElementById(replacedHash)?.scrollIntoView(true);
            }}
        >
            {children}
        </a>
    );
}
