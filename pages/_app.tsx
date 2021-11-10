import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import React, { useEffect } from "react";
import "../styles/global.css";

const commonPaths = ["/", "/sitemap.xml"];

export default function App({ Component, pageProps }: AppProps) {
    useSubDomain();

    return <Component {...pageProps} />;
}

export function getSubDomain() {
    return location.hostname.split(".")[0].split(":")[0];
}

function useSubDomain() {
    useEffect(() => {
        if (commonPaths.includes(location.pathname)) {
            // home page or sitemap
            return;
        }

        const subDomain = getSubDomain();
        const firstPath = location.pathname.split("/")[1];

        if (!["localhost", "next-application", firstPath].includes(subDomain)) {
            // subDomain and firstPath don't match
            const arrHost = location.hostname.split(".");
            arrHost[0] = firstPath;
            location.href = `https://${arrHost.join(".")}${location.pathname}`;
        }
    }, []);
}
