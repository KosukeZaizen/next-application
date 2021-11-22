import { GetServerSideProps } from "next";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import { domain, siteName } from "..";
import {
    getImgNumber,
    Layout,
    whiteShadowStyle,
} from "../../../components/articles/Layout";
import CharacterComment from "../../../components/shared/CharacterComment";
import { HelmetProps } from "../../../components/shared/Helmet";
import { ScrollBox } from "../../../components/shared/ScrollBox";
import ShurikenProgress from "../../../components/shared/ShurikenProgress";
import {
    fetchZAppsFromFrontEnd,
    fetchZAppsFromServerSide,
} from "../../../lib/fetch";
import { useScreenSize } from "../../../lib/screenSize";
import { Page } from "./[pageName]";

const imgNumber = getImgNumber();

export interface Props {
    pages: Page[];
    helmetProps: HelmetProps;
}

export default function ArticlesTop({ pages, helmetProps }: Props) {
    const { screenWidth, screenHeight } = useScreenSize();
    const [newUrl, setNewUrl] = useState<string>("");
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = saveData && JSON.parse(saveData);
        setToken(objSaveData?.token || "");
    }, []);

    const title = "Articles about Japan";
    const description =
        "Articles about studying Japanese language and culture! I hope these articles help you to learn about Japan!";

    return (
        <Layout
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            helmetProps={helmetProps}
        >
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <main style={{ maxWidth: 900, textAlign: "left" }}>
                    <h1
                        css={[
                            {
                                margin: "25px 0 40px",
                                fontWeight: "bolder",
                                textAlign: "center",
                            },
                            whiteShadowStyle,
                        ]}
                    >
                        {title}
                    </h1>
                    <CharacterComment
                        imgNumber={imgNumber}
                        screenWidth={screenWidth}
                        comment={description.split("! ").map((d, i, arr) => (
                            <span key={i}>
                                {d + (i < arr.length - 1 ? "! " : "")}
                            </span>
                        ))}
                    />
                    {pages.some(page => page.url === newUrl) && (
                        <p style={{ color: "red" }}>
                            The url has already been registered!
                        </p>
                    )}
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        <span style={{ fontSize: "x-large" }}>
                            {"New URL:"}
                        </span>
                        <input
                            type="text"
                            value={newUrl}
                            onChange={e =>
                                setNewUrl(
                                    e.target.value
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()
                                )
                            }
                            style={{ width: "100%" }}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                const confirmationResult = window.confirm(
                                    "Do you really want to add?"
                                );
                                if (!confirmationResult) {
                                    return;
                                }

                                localStorage.setItem(
                                    "folktales-register-token",
                                    JSON.stringify({ token })
                                );

                                const formData = new FormData();
                                formData.append("url", newUrl);
                                formData.append("token", token);

                                (async () => {
                                    const response =
                                        await fetchZAppsFromFrontEnd<{
                                            result: string;
                                        }>("/api/Articles/AddNewUrl", {
                                            method: "POST",
                                            body: formData,
                                        });
                                    if (
                                        response.responseType === "system_error"
                                    ) {
                                        alert(response.message);
                                        return;
                                    }
                                    alert(response.result);

                                    if (response.result === "success") {
                                        location.reload();
                                    }
                                })();
                            }}
                        >
                            Add
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        <span style={{ fontSize: "x-large" }}>{"Token:"}</span>
                        <input
                            type="text"
                            defaultValue={token}
                            onChange={e => setToken(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div style={{ margin: "20px 0" }}>
                        {pages.length > 0 ? (
                            pages.map(page => (
                                <article
                                    key={page.title}
                                    style={{ marginBottom: 45 }}
                                >
                                    <ScrollBox>
                                        {page.url}
                                        <Link
                                            href={`/articles/edit/${page.url}`}
                                        >
                                            <a>
                                                <h2>
                                                    {page.title ||
                                                        "Add contents >>"}
                                                </h2>
                                            </a>
                                        </Link>
                                        <p style={{ margin: "0 0 20px" }}>
                                            {page.description}
                                        </p>
                                        {page.released && (
                                            <span
                                                style={{
                                                    backgroundColor: "pink",
                                                    margin: 10,
                                                    padding: 10,
                                                }}
                                            >
                                                {"released"}
                                            </span>
                                        )}
                                        {page.isAboutFolktale && (
                                            <span
                                                style={{
                                                    backgroundColor: "yellow",
                                                    margin: 10,
                                                    padding: 10,
                                                }}
                                            >
                                                {"folktale"}
                                            </span>
                                        )}
                                    </ScrollBox>
                                </article>
                            ))
                        ) : (
                            <ShurikenProgress size="20%" />
                        )}
                    </div>
                </main>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const response: Response = await fetchZAppsFromServerSide(
        "api/Articles/GetAllArticlesForEdit"
    );
    const pages: Page[] = await response.json();

    return {
        props: {
            pages,
            helmetProps: {
                title: "Edit",
                desc: "edit",
                siteName,
                domain,
                noindex: true,
            },
        }, // will be passed to the page component as props
    };
};
