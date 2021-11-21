import { debounce } from "@material-ui/core";
import { GetServerSideProps } from "next";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import { domain, siteName } from "..";
import { getImgNumber } from "../../../components/articles/Layout";
import { checkImgExtension } from "../../../components/articles/Markdown/ImageRender";
import { Helmet, HelmetProps } from "../../../components/shared/Helmet";
import { fetchZApps } from "../../../lib/fetch";
import { useScreenSize } from "../../../lib/screenSize";
import { ArticleContent, IndexInfo } from "../[pageName]";

const fireWindowScroll = debounce(() => {
    window.dispatchEvent(new CustomEvent("scroll"));
}, 100);

export interface Page {
    url?: string;
    title: string;
    description: string;
    articleContent: string;
    released?: boolean;
    isAboutFolktale?: boolean;
}

interface Props extends Page {
    indexInfo: IndexInfo;
    imgNumber: number;
    pageName: string;
    helmetProps: HelmetProps;
    released?: boolean;
}

export default function Articles({
    title: pTitle,
    description: pDescription,
    articleContent: pArticleContent,
    isAboutFolktale: pIsAboutFolktale,
    pageName,
    released,
    indexInfo,
    imgNumber,
    helmetProps,
}: Props) {
    const [title, setTitle] = useState<Page["title"]>(pTitle);
    const [description, setDescription] =
        useState<Page["description"]>(pDescription);
    const [content, setContent] =
        useState<Page["articleContent"]>(pArticleContent);
    const [isAboutFolktale, setIsAboutFolktale] =
        useState<Page["isAboutFolktale"]>(pIsAboutFolktale);

    const { screenWidth, screenHeight } = useScreenSize();
    const [token, setToken] = useState("");

    useEffect(() => {
        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = saveData && JSON.parse(saveData);
        setToken(objSaveData?.token || "");
    }, []);

    const save = async () => {
        try {
            const imgLine = content
                ?.split("\n")
                ?.find(c => c.includes("![") && checkImgExtension(c));
            const imgPath = imgLine
                ? imgLine.split("](")[1].replace(")", "")
                : "";

            const formData = new FormData();
            formData.append("url", pageName);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("articleContent", content);
            formData.append("imgPath", imgPath);
            formData.append(
                "isAboutFolktale",
                isAboutFolktale ? "true" : "false"
            );
            formData.append("token", token);

            const response = await fetch("/api/Articles/UpdateContents", {
                method: "POST",
                body: formData,
            });
            const result: string = await response.text();
            return result;
        } catch (e) {
            return "Failed to save...";
        }
    };

    return (
        <>
            <Helmet {...helmetProps} />
            <div
                style={{
                    width: "100%",
                    height: screenHeight - 130,
                    display: "flex",
                    marginTop: 20,
                }}
            >
                <div
                    style={{
                        flex: 1,
                        padding: 30,
                        height: screenHeight - 130,
                        overflowY: "scroll",
                        marginRight: 15,
                    }}
                    onScroll={fireWindowScroll} // to fire lazy-loading
                >
                    <ArticleContent
                        pageName={pageName}
                        title={title}
                        description={description}
                        imgNumber={imgNumber}
                        width={screenWidth / 3}
                        content={content}
                        // adsense={false}
                        otherArticles={[]}
                        indexInfo={indexInfo}
                    />
                </div>
                <div
                    style={{
                        flex: 2,
                        width: "100%",
                        overflowY: "scroll",
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            style={{ width: "100%" }}
                        />
                        <button
                            onClick={() => {
                                setTitle("folktale");
                                setDescription(pageName);
                            }}
                        >
                            folktale
                        </button>
                    </div>
                    {title != "folktale" && (
                        <textarea
                            style={{ width: "100%", height: 90 }}
                            defaultValue={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    )}
                    <textarea
                        style={{
                            width: "100%",
                            height:
                                title != "folktale"
                                    ? screenHeight - 270
                                    : screenHeight - 170,
                            padding: 10,
                        }}
                        defaultValue={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
            </div>
            <input
                type="text"
                style={{ width: "100%" }}
                onChange={e => setToken(e.target.value)}
                defaultValue={token}
            />
            <div style={{ width: "100%", textAlign: "center" }}>
                {released && (
                    <span style={{ color: "red", margin: "0 15px" }}>
                        {"released"}
                    </span>
                )}
                {"isAboutFolktale:"}
                <input
                    type="checkbox"
                    checked={isAboutFolktale}
                    onChange={ev => setIsAboutFolktale(ev.target.checked)}
                />
                <button
                    className="btn btn-primary"
                    style={{ margin: 15 }}
                    onClick={async () => {
                        const confirmationResult = window.confirm(
                            "Do you really want to save?"
                        );
                        if (!confirmationResult) {
                            return;
                        }

                        localStorage.setItem(
                            "folktales-register-token",
                            JSON.stringify({ token })
                        );

                        alert(await save());
                    }}
                >
                    Save
                </button>
                <button
                    className="btn btn-primary"
                    style={{ margin: 15 }}
                    onClick={async () => {
                        const confirmationResult = window.confirm(
                            "Do you really want to release?"
                        );
                        if (!confirmationResult) {
                            return;
                        }

                        const resultSave = await save();
                        if (resultSave !== "success") {
                            alert(resultSave);
                            return;
                        }

                        const formData = new FormData();
                        formData.append("url", pageName);
                        formData.append("token", token);

                        fetch("/api/Articles/Register", {
                            method: "POST",
                            body: formData,
                        })
                            .then(async response => {
                                const result: string = await response.text();
                                alert(result);
                            })
                            .catch(() => {
                                alert("Failed to release...");
                            });
                    }}
                >
                    Release
                </button>
                <button
                    className="btn btn-primary"
                    style={{ margin: 15 }}
                    onClick={() => {
                        const confirmationResult = window.confirm(
                            "Do you really want to hide?"
                        );
                        if (!confirmationResult) {
                            return;
                        }

                        localStorage.setItem(
                            "folktales-register-token",
                            JSON.stringify({ token })
                        );

                        const formData = new FormData();
                        formData.append("url", pageName);
                        formData.append("token", token);

                        fetch("/api/Articles/Hide", {
                            method: "POST",
                            body: formData,
                        })
                            .then(async response => {
                                const result: string = await response.text();
                                alert(result);
                            })
                            .catch(() => {
                                alert("Failed to hide...");
                            });
                    }}
                >
                    Hide
                </button>
                <Link href="/articles/edit">
                    <a>
                        <button
                            className="btn btn-primary"
                            style={{ margin: 15 }}
                        >
                            Go to Edit Top
                        </button>
                    </a>
                </Link>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<
    Props,
    { pageName: string }
> = async ({ params }) => {
    const pageName = params?.pageName;
    if (!pageName) {
        return { notFound: true, revalidate: 10 };
    }

    // Redirect to lower case
    const lowerPageName = pageName.toLowerCase();
    if (pageName !== lowerPageName) {
        return {
            redirect: {
                permanent: true,
                destination: lowerPageName,
            },
        };
    }

    // Article
    const response: Response = await fetchZApps(
        `api/Articles/GetArticleForEdit?p=${pageName}`
    );
    const {
        url,
        description,
        title,
        isAboutFolktale,
        articleContent,
        released,
    }: Page = await response.json();

    const indexInfo = articleContent
        .split("\n")
        .filter(c => c.includes("##") && !c.includes("###"))
        .map(c => {
            const linkText = c.split("#").join("").trim();
            const encodedUrl = encodeURIComponent(linkText);
            return { linkText, encodedUrl };
        });

    return {
        props: {
            pageName,
            url,
            description,
            title,
            isAboutFolktale,
            articleContent,
            indexInfo,
            imgNumber: getImgNumber(pageName.length),
            helmetProps: {
                title,
                desc: description,
                domain,
                siteName,
                noindex: true,
            },
            released,
        },
    };

    // const response: Response = await fetch(
    //     `api/Articles/GetArticleForEdit?p=${context.params?.pageName}`
    // );
    // const page: Page = await response.json();

    // return {
    //     props: {
    //         ...page,
    //         helmetProps: {
    //             title: page.title,
    //             desc: page.description,
    //             siteName,
    //             domain,
    //             noindex: true,
    //         },
    //     }, // will be passed to the page component as props
    // };
};
