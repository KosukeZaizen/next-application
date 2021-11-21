import { useRouter } from "next/dist/client/router";
import React from "react";
import Head from "next/head";

export interface HelmetProps {
    noindex?: boolean;
    title: string;
    desc: string;
    isHome?: boolean;
    ogImg?: string;
    domain: string;
    siteName: string;
}

export const Helmet = ({
    noindex,
    title,
    desc,
    isHome,
    ogImg,
    domain,
    siteName,
}: HelmetProps) => {
    const router = useRouter();
    const path = router.asPath;
    const url = `https://${domain}${path}`;
    const subDomain = domain.split(".")[0];

    return (
        <Head>
            <meta
                name="twitter:card"
                content={isHome ? "summary" : "summary_large_image"}
            />
            <meta property="og:type" content={isHome ? "website" : "article"} />
            <meta name="twitter:site" content="@LingualNinja" />
            <meta
                property="og:image"
                content={ogImg || "https://www.lingual-ninja.com/ogp-img.png"}
            />
            <meta property="og:url" content={url} />
            {siteName && <meta property="og:site_name" content={siteName} />}
            <meta property="fb:app_id" content="217853132566874" />
            <meta property="fb:page_id" content="491712431290062" />
            <title>{title}</title>
            <meta property="og:image:alt" content={title} />
            <meta name="description" content={desc} />
            {noindex && <meta name="robots" content="noindex" />}
            <link
                rel="icon"
                type="image/png"
                href={`/${subDomain}Favicon.ico`}
                sizes="16x16"
            />
        </Head>
    );
};
