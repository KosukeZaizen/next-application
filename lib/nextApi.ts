import { NextApiResponse } from "next";
import { Req, StrictQuery } from "../types/next";
import { SERVER_SIDE_ERROR_MESSAGE } from "./error";

export function sendRes<T>(res: NextApiResponse<T>, responseData: T) {
    res.status(200).json({ responseType: "success", ...responseData });
}

export const makeApi =
    <Query, Res>(
        handler: (
            query: StrictQuery<Query>
        ) => Promise<ServerResponse<Res>> | ServerResponse<Res>
    ) =>
    async (
        req: Req<Query>,
        res: NextApiResponse<ServerResponse<Res>>
    ): Promise<void> => {
        try {
            sendRes(res, await handler(req.query));
        } catch {
            sendRes(res, {
                responseType: "error",
                message: SERVER_SIDE_ERROR_MESSAGE,
            });
        }
    };

export type ResponseType = "success" | "error";

export interface ErrorResponse {
    responseType: "error";
    message: string;
}

export type ServerResponse<T> =
    | (T & { responseType: "success" })
    | ErrorResponse;
