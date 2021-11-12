import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Helmet as ReactHelmet } from "react-helmet";
import { getSubDomain } from "../../pages/_app";

export const Helmet = ({
    noindex,
    title,
    desc,
    isHome,
    img,
}: {
    noindex?: boolean;
    title?: string;
    desc?: string;
    isHome?: boolean;
    img?: string;
}) => {
    const r = useRouter();
    console.log("r", r);

    return (
        <ReactHelmet>
            <meta
                name="twitter:card"
                content={isHome ? "summary" : "summary_large_image"}
            />
            <meta name="twitter:site" content="@LingualNinja" />
            <meta property="og:image" content={img} />
            {/* <meta property="og:url" content={location.href} /> */}
            {title && <title>{title}</title>}
            {desc && <meta name="description" content={desc} />}
            {noindex && <meta name="robots" content="noindex" />}
            {/* {subDomain && (
                <link
                    rel="icon"
                    type="image/png"
                    href={`${subDomain}Favicon.ico`}
                    sizes="16x16"
                />
            )} */}
        </ReactHelmet>
    );
};

function useSubDomain() {
    const [subDomain, setSubDomain] = useState("");
    useEffect(() => {
        const sd = getSubDomain();
        if (sd !== "localhost") {
            setSubDomain(sd);
        }
    }, []);

    return subDomain;
}
