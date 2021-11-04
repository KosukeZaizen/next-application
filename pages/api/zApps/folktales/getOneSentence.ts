import { fetchZApps } from "../../../../lib/fetch";
import { apiGet } from "../../../../lib/nextApi";
import { ServerResponse } from "../../../../types/fetch";
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
type Response = ServerResponse<{
    sentence: sentence;
    words: word[];
}>;

export default apiGet<Params>(
    async ({ storyName, lineNumber }): Promise<Response> => {
        const url = `api/Stories/GetOneSentence/${storyName}/${lineNumber}`;
        const response = await fetchZApps(url);

        return await response.json();
    }
);
