import { fetchZApps } from "../../../../lib/fetch";
import { HandlerResponse, makeApi } from "../../../../lib/nextApi";
import { StrictQuery } from "../../../../types/next";
import { sentence, word } from "../../../../types/stories";

export interface GetOneSentenceQuery {
    storyName: string;
    lineNumber: number;
}

export interface GetOneSentenceResponse {
    sentence: sentence;
    words: word[];
}

const handler = async (
    query: StrictQuery<GetOneSentenceQuery>
): Promise<HandlerResponse<GetOneSentenceResponse>> => {
    const { storyName, lineNumber } = query;
    const url = `api/Stories/GetOneSentence/${storyName}/${lineNumber}`;
    const response = await fetchZApps(url);

    return await response.json();
};

export default makeApi(handler);
