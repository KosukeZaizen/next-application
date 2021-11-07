import { GetServerSideProps } from "next";
import React from "react";
import Articles from "../components/articles/Home";
import { fetchZApps } from "../lib/fetch";
import { Page } from "./articles/[pageName]";

type Props = { type: "articles"; pages: Page[] };

export default function Home(props: Props) {
    switch (props.type) {
        case "articles": {
            return <Articles {...props} />;
        }
        default: {
            const exhaustiveCheck: never = props.type;
        }
    }
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
    req: {
        headers: { host },
    },
}) => {
    console.log("host", host);
    const response: Response = await fetchZApps("api/Articles/GetAllArticles");
    const pages: Page[] = await response.json();
    return {
        props: {
            type: "articles",
            pages,
        },
    };
};
