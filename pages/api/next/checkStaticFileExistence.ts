import { apiGet } from "../../../lib/nextApi";
import { getErrorMessage } from "../../../lib/error";
import { GetParams } from "../../../types/next";
import { checkFileExistence, checkValidPath } from "./removeStaticCache";

export interface CheckStaticFileExistence {
    url: "/api/next/checkStaticFileExistence";
    params: Params;
    response: Response;
}
type Params = { path: string };
type Response = {
    message: string;
    executionResults?: ExecutionResults;
};
type ExecutionResults = {
    htmlCheck: string;
    jsonCheck: string;
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

        const htmlCheck = checkFileExistence(
            `./.next/server/pages${path}.html`
        );
        const jsonCheck = checkFileExistence(
            `./.next/server/pages${path}.json`
        );

        return {
            message: "Done!",
            executionResults: {
                htmlCheck,
                jsonCheck,
            },
        };
    } catch (error) {
        return {
            message: "Error! " + getErrorMessage(error),
        };
    }
};

export default apiGet<CheckStaticFileExistence>(handler);
