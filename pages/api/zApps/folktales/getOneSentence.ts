import { fetchZApps } from "../../../../lib/fetch";
import { makeApi } from "../../../../lib/nextApi";
import { ServerResponse } from "../../../../types/fetch";
import { StrictQuery } from "../../../../types/next";
import { sentence, word } from "../../../../types/stories";

export interface GetOneSentenceQuery {
    storyName: string;
    lineNumber: number;
}

export type GetOneSentenceResponse = ServerResponse<{
    sentence: sentence;
    words: word[];
}>;

const handler = async (
    query: StrictQuery<GetOneSentenceQuery>
): Promise<GetOneSentenceResponse> => {
    const { storyName, lineNumber } = query;
    const url = `api/Stories/GetOneSentence/${storyName}/${lineNumber}`;
    const response = await fetchZApps(url);

    return await response.json();
};

export default makeApi(handler);
