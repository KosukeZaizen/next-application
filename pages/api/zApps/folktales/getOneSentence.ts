import { fetchZApps } from "../../../../lib/fetch";
import { apiGet } from "../../../../lib/nextApi";
import { ServerResponse } from "../../../../types/fetch";
import { sentence, word } from "../../../../types/stories";

export type GetOneSentenceParams = {
    storyName: string;
    lineNumber: number;
};

export type GetOneSentenceResponse = ServerResponse<{
    sentence: sentence;
    words: word[];
}>;

export default apiGet<GetOneSentenceParams, GetOneSentenceResponse>(
    async params => {
        const { storyName, lineNumber } = params;
        const url = `api/Stories/GetOneSentence/${storyName}/${lineNumber}`;
        const response = await fetchZApps(url);

        return await response.json();
    }
);
