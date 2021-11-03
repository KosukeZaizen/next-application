import { NextApiResponse } from "next";
import { NextApi, StrictQuery } from "../types/next";

export function sendRes<T>(res: NextApiResponse<T>, responseData: T) {
    res.status(200).json(responseData);
}

export const makeApi =
    <Query, Res>(
        handler: (
            query: StrictQuery<Query>
        ) => Promise<PossibleResponse<Res>> | PossibleResponse<Res>
    ) =>
    async ({ req, res }: NextApi<Query, PossibleResponse<Res>>) => {
        sendRes(res, await handler(req.query));
    };

export interface ErrorResponse {
    error: string;
}

export type PossibleResponse<T> = T | ErrorResponse;
