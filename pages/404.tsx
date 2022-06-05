import React, { useEffect, useState } from "react";
import { Helmet } from "../components/shared/Helmet";
import ShurikenProgress from "../components/shared/ShurikenProgress";
import { css } from "../lib/css";
import Articles404 from "../components/articles/404";

export default function PageNotFound() {
    const [content, setContent] = useState(<Loading />);

    useEffect(() => {
        (async () => {
            const setImportedContent = async (appName: string) => {
                setContent(await tryImport(appName));
            };

            try {
                await setImportedContent(location.hostname.split(".")[0]);
            } catch {
                try {
                    await setImportedContent(
                        location.pathname
                            .split("/")[1]
                            .split("#")[0]
                            .split("?")[0]
                    );
                } catch {
                    setContent(<Articles404 />);
                }
            }
        })();
    }, []);

    return (
        <>
            <Helmet
                title={"404 | Page not found"}
                desc={"Page was not found."}
                domain={""}
                siteName={""}
                noindex
            />
            {content}
        </>
    );
}

function Loading() {
    return (
        <div css={shurikenContainerStyle}>
            <ShurikenProgress size="100%" style={shurikenStyle} />
        </div>
    );
}

const shurikenStyle = css({
    maxWidth: 200,
    width: "20%",
});

const shurikenContainerStyle = css({
    marginTop: 50,
    zIndex: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

async function tryImport(appName: string) {
    const Content = (await import(`../components/${appName}/404`)).default;
    return <Content />;
}
