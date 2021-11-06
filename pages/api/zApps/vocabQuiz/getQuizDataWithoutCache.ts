import { GenreAndVocab } from "../../../../components/articles/Markdown/ImageRender/VocabList";
import { fetchZApps } from "../../../../lib/fetch";
import { apiGet } from "../../../../lib/nextApi";
import { GetParams } from "../../../../types/next";

export interface GetQuizDataWithoutCache {
    url: "/api/zApps/vocabQuiz/getQuizDataWithoutCache";
    params: Params;
    response: Response;
}
type Params = { genreName: string };
type Response = GenreAndVocab;

const handler = async ({ genreName }: GetParams<Params>): Promise<Response> => {
    const url = `api/VocabQuiz/GetQuizDataWithoutCache/${genreName}`;
    const response = await fetchZApps(url);

    return await response.json();
};

export default apiGet(handler);
