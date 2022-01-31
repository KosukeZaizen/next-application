import { apiGet } from "../../../lib/nextApi";
import { EmptyObject } from "../../../types/util";
import child_process from "child_process";
import { getErrorMessage } from "../../../lib/error";
import { execCommandAsync } from "../../../lib/childProcess";

export interface RemoveStaticCache {
    url: "/api/next/removeStaticCache";
    params: Params;
    response: Response;
}
type Params = EmptyObject;
type Response = {
    message: string;
    lastExecutionDate: string;
    executionResult?: ExecutionResult;
};
type ExecutionResult =
    | {
          stdout: string;
          stderr: string;
          error: child_process.ExecException | null;
          removedFilesAndFolders: string[];
      }
    | { errorMsg: string }
    | null;

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
            executionResult: lastResponse?.executionResult,
        };
    }

    if (today === lastResponse?.lastExecutionDate) {
        return {
            message: "Today's execution has already been finished!",
            lastExecutionDate: `${year}/${month}/${day}`,
            executionResult: lastResponse.executionResult,
        };
    }

    isExecutingNow = true;
    try {
        const prevDirResult = (await execCommandAsync("dir /b")).stdout.split(
            "\r\n"
        );
        const deleteResult = await execCommandAsync("rmdir /s /q .next");
        const dirResult = (await execCommandAsync("dir /b")).stdout.split(
            "\r\n"
        );

        const removedFilesAndFolders = prevDirResult.filter(
            p => !dirResult.includes(p)
        );

        lastResponse = {
            message: "Done!",
            lastExecutionDate: `${year}/${month}/${day}`,
            executionResult: { ...deleteResult, removedFilesAndFolders },
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
