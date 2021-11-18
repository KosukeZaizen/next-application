import { GetServerSideProps } from "next";
import React from "react";
import Articles, {
    ArticlesHomeProps,
    getArticleHomeProps,
} from "../components/articles/Home";

type Props = ArticlesHomeProps;

export default function Home(props: Props) {
    switch (props.type) {
        case "articles": {
            return <Articles {...props} />;
        }
        default: {
            const _exhaustiveCheck: never = props.type;
        }
    }
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
    req: {
        headers: { host },
    },
}) => {
    console.log("host", host);

    // Articles
    const props = await getArticleHomeProps();

    return { props };
};
