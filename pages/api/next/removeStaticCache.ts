import { apiGet } from "../../../lib/nextApi";
import { EmptyObject } from "../../../types/util";
import child_process from "child_process";
import { getErrorMessage } from "../../../lib/error";
import { execCommandAsync } from "../../../lib/childProcess";
import { generateSitemapXml } from "../../articles/sitemap.xml";
import { apps } from "../../../const/public";

export interface RemoveStaticCache {
    url: "/api/next/removeStaticCache";
    params: Params;
    response: Response;
}
type Params = EmptyObject;
type Response = {
    message: string;
    lastExecutionDate: string;
    executionResults?: ExecutionResults;
};
type ExecutionResult = {
    stdout: string;
    stderr: string;
    error: child_process.ExecException | null;
};
type ExecutionResults = {
    [url: string]: {
        htmlDeletion: ExecutionResult;
        jsonDeletion: ExecutionResult;
        fetchStatus: number;
    };
};
let lastResponse: Response | null = null;
let isExecutingNow = false;

const handler = async (): Promise<Response> => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const today = `${year}/${month}/${day}`;

    if (isExecutingNow) {
        return {
            message:
                "Now another person is executing the same command! Wait for a while!",
            lastExecutionDate: `${year}/${month}/${day}`,
            executionResults: lastResponse?.executionResults,
        };
    }

    if (today === lastResponse?.lastExecutionDate) {
        return {
            message: "Today's execution has already been finished!",
            lastExecutionDate: `${year}/${month}/${day}`,
            executionResults: lastResponse.executionResults,
        };
    }

    isExecutingNow = true;
    try {
        const sitemap = await generateSitemapXml();
        const urls = sitemap
            .split("<loc>")
            .filter((u, i) => i)
            .map(u => u.split("</loc>")[0])
            .map(u => u.replace(apps.articles.url, ""));

        const executionResults: ExecutionResults = {};
        for (const url of urls) {
            const commandPath = url.split("/").join("\\");

            executionResults[url] = {
                htmlDeletion: await execCommandAsync(
                    `del .\\.next\\server\\pages${commandPath}.html`
                ),
                jsonDeletion: await execCommandAsync(
                    `del .\\.next\\server\\pages${commandPath}.json`
                ),
                fetchStatus: (await fetch(`${apps.articles.url}${url}`)).status,
            };
        }

        lastResponse = {
            message: "Done!",
            lastExecutionDate: `${year}/${month}/${day}`,
            executionResults,
        };
        isExecutingNow = false;
        return lastResponse;
    } catch (error) {
        lastResponse = {
            message: "Error! " + getErrorMessage(error),
            lastExecutionDate: `${year}/${month}/${day}`,
        };
        isExecutingNow = false;
        return lastResponse;
    }
};

export default apiGet<RemoveStaticCache>(handler);
