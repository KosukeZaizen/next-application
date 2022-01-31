import { apiGet } from "../../../lib/nextApi";
import child_process from "child_process";
import { getErrorMessage } from "../../../lib/error";
import { execCommandAsync } from "../../../lib/childProcess";
import { apps } from "../../../const/public";
import { GetParams } from "../../../types/next";
import { getSsgUrls } from "../../articles/sitemap.xml";

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
    stdout: string;
    stderr: string;
    error: child_process.ExecException | null;
};
type ExecutionResults = {
    htmlDeletion: ExecutionResult;
    jsonDeletion: ExecutionResult;
    fetchStatus: number;
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

        const commandPath = path.split("/").join("\\");

        const htmlDeletion = await execCommandAsync(
            `del .\\.next\\server\\pages${commandPath}.html`
        );
        const jsonDeletion = await execCommandAsync(
            `del .\\.next\\server\\pages${commandPath}.json`
        );

        const fetchStatus = (await fetch(`${apps.articles.url}${path}`)).status;

        return {
            message: "Done!",
            executionResults: {
                htmlDeletion,
                jsonDeletion,
                fetchStatus,
            },
        };
    } catch (error) {
        return {
            message: "Error! " + getErrorMessage(error),
        };
    }
};

async function checkValidPath(path: string) {
    const ssgUrls = await getSsgUrls();
    return ssgUrls.map(u => u.replace(apps.articles.url, "")).includes(path);
}

export default apiGet<RemoveStaticCache>(handler);
