import { NextApiRequest, NextApiResponse } from "next";

export interface Req<Query> extends Omit<NextApiRequest, "query"> {
    query: GetParams<Query>;
}

export type GetParams<Params> = {
    [key in keyof Params]?: string | string[];
};

export interface NextApi<Query, Res> {
    req: Req<Query>;
    res: NextApiResponse<Res>;
}
