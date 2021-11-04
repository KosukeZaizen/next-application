import { fetchZApps } from "../../../../lib/fetch";
import { apiGet } from "../../../../lib/nextApi";
import { ServerResponse } from "../../../../types/fetch";
import { StrictParams } from "../../../../types/next";
import { sentence, word } from "../../../../types/stories";

export interface GetOneSentence {
    url: "/api/zApps/folktales/getOneSentence";
    params: Params;
    response: Response;
}
type Params = {
    storyName: string;
    lineNumber: number;
};
type Response = {
    sentence: sentence;
    words: word[];
};

const handler = async ({
    storyName,
    lineNumber,
}: StrictParams<Params>): Promise<ServerResponse<Response>> => {
    const url = `api/Stories/GetOneSentence/${storyName}/${lineNumber}`;
    const response = await fetchZApps(url);

    return await response.json();
};

export default apiGet(handler);
