import { GetStaticProps } from "next";
import * as React from "react";
import { useState } from "react";
import { fetchZApps } from "..";

export interface Page {
    url?: string;
    title: string;
    description: string;
    articleContent: string;
    imgPath?: string;
    isAboutFolktale?: boolean;
}

interface Props extends Page {}

// export function getImgNumber(num: number = 0) {
//     const today = new Date();
//     const todayNumber = today.getMonth() + today.getDate() + num;
//     const mod = todayNumber % 30;
//     if (mod > 22) return 2;
//     if (mod > 14) return 3;
//     return 1;
// }

const Articles = ({
    title,
    description,
    articleContent,
    isAboutFolktale,
}: Props) => {
    return (
        <div style={{ width: "100%" }} className="center">
            <ArticleContent
                title={title}
                description={description}
                imgNumber={0}
                width={1000}
                indexLi={[]}
                content={articleContent}
                adsense={true}
                isAboutFolktale={isAboutFolktale}
            />
        </div>
    );
};

// export const excludedArticleTitles = ["Kamikaze"];
export const excludedArticleTitles = [];

// 0 から 4.9 まで 0.1 刻み
const textShadow = Array.from(Array(50).keys())
    .map(n => `0 0 ${n / 10}px white`)
    .join(",");

interface ArticleContentProps {
    title: string;
    description: string;
    isAboutFolktale?: boolean;
    imgNumber: number;
    width: number;
    indexLi: JSX.Element[];
    content: string;
    adsense: boolean;
}
export function ArticleContent({
    title,
    description,
    imgNumber,
    width,
    indexLi,
    content,
    //adsense,
    isAboutFolktale,
}: ArticleContentProps) {
    const [otherArticles, setOtherArticles] = useState<Page[]>([]);

    // useEffect(() => {
    //     if (title) {
    //         const getArticles = async () => {
    //             const url =
    //                 "https://articles.lingual-ninja.com/api/Articles/GetRandomArticles";

    //             const titlesToExclude = [title, ...excludedArticleTitles];
    //             const param = `?num=10&${titlesToExclude
    //                 .map(t => `wordsToExclude=${t}`)
    //                 .join("&")}${
    //                 isAboutFolktale ? "&isAboutFolktale=true" : ""
    //             }`;

    //             const response: Response = await fetch(url + param);
    //             const pages: Page[] = await response.json();
    //             setOtherArticles(pages);
    //         };
    //         getArticles();
    //     }
    // }, [title, isAboutFolktale]);

    const isWide = width > 991;

    return (
        <main style={{ maxWidth: 800 }}>
            <article style={{ textAlign: "left" }}>
                {title ? (
                    <h1
                        style={{
                            margin: "25px auto 30px",
                            textAlign: "center",
                        }}
                        className="whiteShadow"
                    >
                        {title}
                    </h1>
                ) : (
                    <>Loading...</>
                )}
                {content ? (
                    content
                ) : (
                    // <Markdown
                    //     source={content}
                    //     style={{ margin: "25px 0 40px", textShadow }}
                    // />
                    <>Loading...</>
                )}
            </article>
        </main>
    );
}

// export function getIndex(content: string, pageName: string) {
//     return content
//         .split("\n")
//         .filter(c => c.includes("##") && !c.includes("###"))
//         .map(c => {
//             const linkText = c.split("#").join("").trim();
//             const encodedUrl = encodeURIComponent(linkText);
//             return (
//                 <li key={linkText} style={{ marginTop: 10, marginBottom: 5 }}>
//                     <AnchorLink targetHash={`#${encodedUrl}`}>
//                         {linkText}
//                     </AnchorLink>
//                 </li>
//             );
//         });
// }

export default Articles;

export async function getStaticPaths() {
    const response: Response = await fetchZApps("api/Articles/GetAllArticles");
    const pages: Page[] = await response.json();
    return {
        paths: pages
            .map(p => p.url)
            .filter(u => u)
            .map(u => `/articles/${u}`),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<Props, { pageName: string }> =
    async ({ params }) => {
        const pageName = params?.pageName;
        if (!pageName) return { notFound: true };

        const lowerPageName = pageName.toLowerCase();
        // if (pageName !== lowerPageName) {
        //     history.push(`/articles/${lowerPageName}`);
        //     return;
        // }

        const response: Response = await fetchZApps(
            `api/Articles/GetArticle?p=${pageName}`
        );
        const page: Page = await response.json();
        return {
            props: page,
        };
    };
