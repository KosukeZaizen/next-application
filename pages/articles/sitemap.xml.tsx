import { GetServerSidePropsContext } from "next";
import { apps } from "../../const/public";
import { fetchZAppsFromServerSide } from "../../lib/fetch";
import { Page } from "./[pageName]";

const topUrl = apps.articles.url;

const SitemapPage = () => null;
export default SitemapPage;

export const getServerSideProps = async ({
    res,
}: GetServerSidePropsContext) => {
    const xml = await generateSitemapXml();

    res.statusCode = 200;
    // res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // Cache for 24 hours
    res.setHeader("Content-Type", "text/xml");
    res.end(xml);

    return {
        props: {},
    };
};

async function generateSitemapXml(): Promise<string> {
    let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const response: Response[] = await Promise.all([
        fetchZAppsFromServerSide(
            "api/Articles/GetAllArticles?isAboutFolktale=false"
        ),
        fetchZAppsFromServerSide(
            "api/Articles/GetAllArticles?isAboutFolktale=true"
        ),
    ]);
    const pages: Page[] = (
        await Promise.all(response.map(r => r.json()))
    ).flat();
    const paths = pages
        .map(p => p.url?.toLowerCase())
        .filter(u => u)
        .map(u => `${topUrl}/articles/${u}`);

    [topUrl, ...paths].forEach(url => {
        xml += `<url><loc>${url}</loc></url>`;
    });

    xml += `</urlset>`;
    return xml;
}
