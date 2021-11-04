import { NextApiResponse } from "next";
import { ServerResponse } from "../types/fetch";
import { Req, StrictParams } from "../types/next";
import { SERVER_SIDE_ERROR_MESSAGE } from "./error";

export function sendRes<T>(res: NextApiResponse<T>, responseData: T) {
    res.status(200).json({ responseType: "success", ...responseData });
}

export const apiGet =
    <Params, Res>(
        handler: (
            params: StrictParams<Params>
        ) => Promise<ServerResponse<Res>> | ServerResponse<Res>
    ) =>
    async (
        req: Req<Params>,
        res: NextApiResponse<ServerResponse<Res>>
    ): Promise<void> => {
        try {
            sendRes(res, await handler(req.query));
        } catch {
            sendRes(res, {
                responseType: "system_error",
                message: SERVER_SIDE_ERROR_MESSAGE,
            });
        }
    };

export const apiPost =
    <Params, Res>(
        handler: (
            params: Params
        ) => Promise<ServerResponse<Res>> | ServerResponse<Res>
    ) =>
    async (
        req: Req<Params>,
        res: NextApiResponse<ServerResponse<Res>>
    ): Promise<void> => {
        try {
            sendRes(res, await handler(req.body));
        } catch {
            sendRes(res, {
                responseType: "system_error",
                message: SERVER_SIDE_ERROR_MESSAGE,
            });
        }
    };
