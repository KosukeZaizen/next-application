import { NextApiResponse } from "next";
import { Req, StrictQuery } from "../types/next";
import { SERVER_SIDE_ERROR_MESSAGE } from "./error";

export function sendRes<T>(res: NextApiResponse<T>, responseData: T) {
    res.status(200).json(responseData);
}

export const makeApi =
    <Query, Res>(
        handler: (
            query: StrictQuery<Query>
        ) => Promise<HandlerResponse<Res>> | HandlerResponse<Res>
    ) =>
    async (
        req: Req<Query>,
        res: NextApiResponse<HandlerResponse<Res>>
    ): Promise<void> => {
        try {
            sendRes(res, await handler(req.query));
        } catch {
            sendRes(res, {
                error: SERVER_SIDE_ERROR_MESSAGE,
            });
        }
    };

export interface ErrorResponse {
    error: string;
}

export type HandlerResponse<T> = T | ErrorResponse;
