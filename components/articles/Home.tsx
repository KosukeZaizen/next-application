import Head from "next/head";
import Link from "next/link";
import { Page } from "../../pages/articles/[pageName]";
import utilStyles from "../../styles/utils.module.css";
import Layout, { siteTitle } from "./layout";

export default function Home({ pages }: { pages: Page[] }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>[Your Self Introduction]</p>
                <p>
                    (This is a sample website - you’ll be building a site like
                    this in{" "}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>
                    .)
                </p>
            </section>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {pages.map(({ title, url }) => (
                        <li className={utilStyles.listItem} key={url}>
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
