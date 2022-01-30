import { apiGet } from "../../../lib/nextApi";
import { EmptyObject } from "../../../types/util";
import child_process from "child_process";

export interface NextBuild {
    url: "/api/next/build";
    params: Params;
    response: Response;
}
type Params = EmptyObject;
type Response = {
    message: string;
    lastExecutionDate: string;
    executionResult: ExecutionResult;
};
type ExecutionResult = {
    executedTiming: "now" | "past";
    stdout: string;
    stderr: string;
    error: child_process.ExecException | null;
} | null;

let lastExecutionDate = "";
let lastExecutionResult: ExecutionResult = null;
let isExecutingNow = false;

const handler = async (): Promise<Response> => {
    /**
     * This API is still not working well in Production Environment
     */

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const today = `${year}/${month}/${day}`;

    if (isExecutingNow) {
        return {
            message:
                "Now another person is executing the same command! What for a while!",
            lastExecutionDate: `${year}/${month}/${day}`,
            executionResult: lastExecutionResult,
        };
    }

    if (today === lastExecutionDate) {
        return {
            message: "Today's execution has already been finished!",
            lastExecutionDate: `${year}/${month}/${day}`,
            executionResult: lastExecutionResult,
        };
    }

    isExecutingNow = true;
    return {
        message: "Done!",
        lastExecutionDate: `${year}/${month}/${day}`,
        executionResult: await new Promise(r => {
            child_process.exec("next build", function (error, stdout, stderr) {
                const result = {
                    stdout,
                    stderr,
                    error,
                };
                lastExecutionResult = { executedTiming: "past", ...result };
                lastExecutionDate = today;
                isExecutingNow = false;
                r({ executedTiming: "now", ...result });
            });
        }),
    };
};

export default apiGet<NextBuild>(handler);
