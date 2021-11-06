import Head from "next/head";
import Link from "next/link";
import { Page } from "../../pages/articles/[pageName]";
import { Layout } from "./Layout";

export default function Home({ pages }: { pages: Page[] }) {
    return (
        <Layout>
            <Head>
                <title>{"Hello!"}</title>
            </Head>
            <section>
                <p>[Your Self Introduction]</p>
                <p>
                    (This is a sample website - you’ll be building a site like
                    this in{" "}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>
                    .)
                </p>
            </section>
            <section>
                <h2>Blog</h2>
                <ul>
                    {pages.map(({ title, url }) => (
                        <li key={url}>
                            <Link href={`/articles/${url}`}>
                                <a>{title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}
