import { NextApiRequest, NextApiResponse } from "next";

export interface Req<Query> extends Omit<NextApiRequest, "query"> {
    query: StrictParams<Query>;
}

export type StrictParams<Params> = {
    [key in keyof Params]?: string | string[];
};

export interface NextApi<Query, Res> {
    req: Req<Query>;
    res: NextApiResponse<Res>;
}
