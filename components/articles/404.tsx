import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { useScreenSize } from "../../lib/screenSize";
import { domain, siteName } from "../../pages/articles";
import { h1TitleCss, Layout } from "./Layout";

export default function NotFoundPage() {
    const router = useRouter();
    const screenSize = useScreenSize();

    return (
        <Layout
            {...screenSize}
            helmetProps={{
                title: "404 | Page not found",
                desc: "Page not found",
                domain,
                siteName,
            }}
        >
            <h1 css={[h1TitleCss, { fontWeight: "bold" }]}>Page not found!</h1>
            <img
                src={
                    "https://lingualninja.blob.core.windows.net/lingual-storage/appsPublic/img/404.png"
                }
                width="50%"
                alt="404 error"
                title="404 error"
                css={{ marginBottom: 20 }}
            />
            <h2>
                No match for <code>{router.asPath}</code>
            </h2>
            <p>Please check if the url is correct!</p>
            <Link href="/">
                <a>
                    <button
                        style={{ width: "50%", fontWeight: "bold" }}
                        className="btn btn-primary"
                    >
                        {"Home"}
                    </button>
                </a>
            </Link>
        </Layout>
    );
}
