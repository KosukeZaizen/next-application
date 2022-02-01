import { GetServerSideProps } from "next";
import { apps } from "../../const/public";
import { fetchZAppsFromServerSide } from "../../lib/fetch";
import { Page } from "./[[...path]]";

const topUrl = apps.articles.url;

const SitemapPage = () => null;
export default SitemapPage;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const xml = await generateSitemapXml();

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/xml");
    res.end(xml);

    return {
        props: {},
    };
};

async function generateSitemapXml(): Promise<string> {
    let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const ssgUrls = await getSsgUrls();
    const nonSsgUrls = getNonSsgUrls();

    [...ssgUrls, ...nonSsgUrls].forEach(url => {
        xml += `<url><loc>${url}</loc></url>`;
    });

    xml += `</urlset>`;
    return xml;
}

// Pages that doesn't need to be the target of the removal by removeStaticCache
// (removeStaticCache function deletes html and json files created by SSG)
function getNonSsgUrls() {
    return [];
}

// Target of the removal by the removeStaticCache function
// (removeStaticCache function deletes html and json files created by SSG)
export async function getSsgUrls() {
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

    return [`${topUrl}/articles`, ...paths];
}
