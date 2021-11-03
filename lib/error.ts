export const SERVER_SIDE_ERROR_MESSAGE =
    "Server side error occurred in the handler function.";

export function getErrorMessage(e: unknown): string {
    if (e instanceof Error) {
        return `ErrorName:"${e.name}", ErrorMessage:"${e.message}", Stack:"${
            e.stack || "no stack"
        }"`;
    }
    if (typeof e === "string") {
        return e;
    }
    return "unknown error";
}
