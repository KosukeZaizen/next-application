import { apiGet } from "../../../lib/nextApi";
import { getErrorMessage } from "../../../lib/error";
import { apps } from "../../../const/public";
import { GetParams } from "../../../types/next";
import { getSsgUrls } from "../../articles/sitemap.xml";
import { sleepAsync } from "../../../lib/sleep";
import fs from "fs";

export interface RemoveStaticCache {
    url: "/api/next/removeStaticCache";
    params: Params;
    response: Response;
}
type Params = { path: string };
type Response = {
    message: string;
    executionResults?: ExecutionResults;
};
type ExecutionResult = {
    beforeDeletion: string;
    afterDeletion: string;
};
type ExecutionResults = {
    htmlDeletion: ExecutionResult;
    jsonDeletion: ExecutionResult;
    fetchStatus: number;
    afterFetch: { json: string; html: string };
};

const handler = async ({ path }: GetParams<Params>): Promise<Response> => {
    try {
        if (typeof path !== "string") {
            return {
                message: "Error! Invalid parameter.",
            };
        }

        // Prevent from being attacked
        const isValidPath = await checkValidPath(path);
        if (!isValidPath) {
            return {
                message: "Error! Invalid parameter.",
            };
        }

        const htmlDeletion = await executeDeletion(`${path}.html`);
        const jsonDeletion = await executeDeletion(`${path}.json`);

        const fetchStatus = (await fetch(`${apps.articles.url}${path}`)).status;

        await sleepAsync(1000);
        const html = checkFileExistence(`./.next/server/pages${path}.html`);
        const json = checkFileExistence(`./.next/server/pages${path}.html`);

        return {
            message: "Done!",
            executionResults: {
                htmlDeletion,
                jsonDeletion,
                fetchStatus,
                afterFetch: {
                    html,
                    json,
                },
            },
        };
    } catch (error) {
        return {
            message: "Error! " + getErrorMessage(error),
        };
    }
};

export async function checkValidPath(path: string) {
    const ssgUrls = await getSsgUrls();
    return ssgUrls.map(u => u.replace(apps.articles.url, "")).includes(path);
}

async function executeDeletion(
    commandPathWithExtension: string
): Promise<ExecutionResult> {
    const beforeDeletion = checkFileExistence(
        `./.next/server/pages${commandPathWithExtension}`
    );

    try {
        fs.unlinkSync(`./.next/server/pages${commandPathWithExtension}`);
    } catch {
        // Do nothing
    }

    const afterDeletion = checkFileExistence(
        `./.next/server/pages${commandPathWithExtension}`
    );

    return {
        beforeDeletion,
        afterDeletion,
    };
}

export function checkFileExistence(path: string) {
    return fs.existsSync(path) ? "File Exists" : "File Not Found";
}

export default apiGet<RemoveStaticCache>(handler);
