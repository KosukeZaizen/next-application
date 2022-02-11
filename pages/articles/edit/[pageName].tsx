import { debounce } from "@material-ui/core";
import { GetServerSideProps } from "next";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { ArticleContent } from "../../../components/articles/Articles";
import { Author } from "../../../components/articles/Author";
import { checkImgExtension } from "../../../components/articles/Markdown/ImageRender";
import { Helmet, HelmetProps } from "../../../components/shared/Helmet";
import { Link } from "../../../components/shared/Link/Link";
import { fetchZAppsFromFrontEnd } from "../../../lib/fetch";
import { useScreenSize } from "../../../lib/screenSize";

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
    authorId: number;
}

interface Props extends Page {
    imgNumber: number;
    pageName: string;
    allAuthors: Author[];
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
    imgNumber,
    authorId,
    allAuthors,
    helmetProps,
}: Props) {
    const [title, setTitle] = useState<Page["title"]>(pTitle);
    const [description, setDescription] =
        useState<Page["description"]>(pDescription);
    const [content, setContent] =
        useState<Page["articleContent"]>(pArticleContent);
    const [isAboutFolktale, setIsAboutFolktale] =
        useState<Page["isAboutFolktale"]>(pIsAboutFolktale);

    const indexInfo = useMemo(() => makeIndexInfo(content), [content]);

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

            const response = await fetchZAppsFromFrontEnd<{
                result: string;
            }>("/api/Articles/UpdateContents", {
                method: "POST",
                body: formData,
            });

            if (response.responseType === "system_error") {
                return response.message;
            }
            return response.result;
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
                        screenWidth={screenWidth / 3}
                        content={content}
                        otherArticles={[]}
                        indexInfo={indexInfo}
                        authorId={authorId}
                        allAuthors={allAuthors}
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

                        (async () => {
                            const response = await fetchZAppsFromFrontEnd<{
                                result: string;
                            }>("/api/Articles/Register", {
                                method: "POST",
                                body: formData,
                            });
                            if (response.responseType === "system_error") {
                                alert(response.message);
                                return;
                            }
                            alert(response.result);

                            if (response.result === "success") {
                                location.reload();
                            }
                        })();
                    }}
                    disabled={released}
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

                        (async () => {
                            const response = await fetchZAppsFromFrontEnd<{
                                result: string;
                            }>("/api/Articles/Hide", {
                                method: "POST",
                                body: formData,
                            });
                            if (response.responseType === "system_error") {
                                alert(response.message);
                                return;
                            }
                            alert(response.result);

                            if (response.result === "success") {
                                location.reload();
                            }
                        })();
                    }}
                    disabled={!released}
                >
                    Hide
                </button>
                <Link href="/articles/edit">
                    <button className="btn btn-primary" style={{ margin: 15 }}>
                        Go to Edit Top
                    </button>
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
        return { notFound: true };
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

    return {
        redirect: {
            permanent: true,
            destination: `https://articles-edit.lingual-ninja.com/articlesEdit/${pageName}`,
        },
    };

    // // Article
    // const response: Response = await fetchZAppsFromServerSide(
    //     `api/Articles/GetArticleForEdit?p=${pageName}`
    // );
    // const {
    //     url,
    //     description,
    //     title,
    //     isAboutFolktale,
    //     articleContent,
    //     released,
    // }: Page = await response.json();

    // const indexInfo = makeIndexInfo(articleContent);

    // return {
    //     props: {
    //         pageName,
    //         url,
    //         description,
    //         title,
    //         isAboutFolktale,
    //         articleContent,
    //         indexInfo,
    //         imgNumber: getImgNumber(pageName.length),
    //         helmetProps: {
    //             title,
    //             desc: description,
    //             domain,
    //             siteName,
    //             noindex: true,
    //         },
    //         released,
    //     },
    // };
};

function makeIndexInfo(articleContent: string | undefined) {
    return articleContent
        ? articleContent
              .split("\n")
              .filter(c => c.includes("##") && !c.includes("###"))
              .map(c => {
                  const linkText = c.split("#").join("").trim();
                  const encodedUrl = encodeURIComponent(linkText);
                  return { linkText, encodedUrl };
              })
        : [];
}
