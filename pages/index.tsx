import { GetServerSideProps } from "next";
import React from "react";
import ShurikenProgress from "../components/shared/ShurikenProgress";

export default function Home() {
    return <ShurikenProgress size="30%" />;
}

export const getServerSideProps: GetServerSideProps = async ({
    req: {
        headers: { host },
    },
}) => {
    console.log("host", host);

    // Articles
    return { redirect: { permanent: true, destination: "/articles" } };
};
