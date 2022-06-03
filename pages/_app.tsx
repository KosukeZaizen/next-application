import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import React, { useEffect } from "react";
import { startAnimation } from "../components/shared/FooterAnimation/animation";
import { apps, AZURE_HOST } from "../const/public";
import { changeAppState } from "../lib/appState";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
    useNoYouTubeMode();

    useSubDomain();

    useEffect(startAnimation, []);

    return <Component {...pageProps} />;
}

export function getSubDomain() {
    return location.hostname.split(".")[0].split(":")[0];
}

function useSubDomain() {
    useEffect(() => {
        if (location.href.includes(AZURE_HOST)) {
            // redirect from Azure original url to articles
            location.href = location.href.replace(
                AZURE_HOST,
                apps.articles.host
            );
            return;
        }

        if (location.pathname === "/") {
            // home page
            return;
        }

        const subDomain = getSubDomain();
        const firstPath = location.pathname.split("/")[1];

        if (!["localhost", firstPath].includes(subDomain)) {
            // subDomain and firstPath don't match
            const arrHost = location.hostname.split(".");
            arrHost[0] = firstPath;
            location.href = `https://${arrHost.join(".")}${location.pathname}`;
            return;
        }
    }, []);
}

function useNoYouTubeMode() {
    useEffect(() => {
        if (location.hash === "#n" || localStorage.getItem("noYouTubeMode")) {
            changeAppState("isNoYouTubeAdMode", true);
            localStorage.setItem("noYouTubeMode", "yes");
        }
    }, []);
}
