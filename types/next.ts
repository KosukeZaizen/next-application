import { NextApiRequest, NextApiResponse } from "next";

export interface Req<Query> extends Omit<NextApiRequest, "query"> {
    query: StrictQuery<Query>;
}

export type StrictQuery<Query> = { [key in keyof Query]: string | string[] };

export interface NextApi<Query, Res> {
    req: Req<Query>;
    res: NextApiResponse<Res>;
}
