import { NextApiResponse } from "next";
import { ServerResponse } from "../types/fetch";
import { GetParams, Req } from "../types/next";
import { SERVER_SIDE_ERROR_MESSAGE } from "./error";
import { Apis } from "./fetch";

export function sendRes<T>(
    res: NextApiResponse<ServerResponse<T>>,
    responseData: T
) {
    res.status(200).json({ responseType: "success", ...responseData });
}

export const apiGet =
    <T extends Apis>(
        handler: (
            params: GetParams<T["params"]>
        ) => Promise<T["response"]> | T["response"]
    ) =>
    async (
        req: Req<T["params"]>,
        res: NextApiResponse<ServerResponse<T["response"]>>
    ): Promise<void> => {
        try {
            if (req.method !== "GET") {
                console.log("Fetch method is not GET");
            }
            sendRes(res, await handler(req.query));
        } catch (error) {
            console.log("error", error);
            sendRes(res, {
                responseType: "system_error",
                message: SERVER_SIDE_ERROR_MESSAGE,
            });
        }
    };

export const apiPost =
    <T extends Apis>(
        handler: (params: T["params"]) => Promise<T["response"]> | T["response"]
    ) =>
    async (
        req: Req<T["params"]>,
        res: NextApiResponse<ServerResponse<T["response"]>>
    ): Promise<void> => {
        try {
            if (req.method !== "POST") {
                console.log("Fetch method is not POST");
            }
            sendRes(res, await handler(req.body));
        } catch (error) {
            console.log("error", error);
            sendRes(res, {
                responseType: "system_error",
                message: SERVER_SIDE_ERROR_MESSAGE,
            });
        }
    };
