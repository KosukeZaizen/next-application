import React, { useEffect, useState } from "react";
import { Z_APPS_TOP_URL } from "../../../../../const/public";
import { fetchGet } from "../../../../../lib/fetch";
import { GetQuizDataWithoutCache } from "../../../../../pages/api/zApps/vocabQuiz/getQuizDataWithoutCache";
import { vocab, vocabGenre, VocabGenreId } from "../../../../../types/vocab";
import { ATargetBlank } from "../../../../shared/Link/ATargetBlank";
import { linkShadowStyle } from "../../LinkBlockRender/linkShadowStyle";
import { VList } from "./List";

const initialVocabGenre: vocabGenre = {
    genreId: VocabGenreId(0),
    genreName: "",
    order: 0,
    youtube: "",
    released: true,
};
export function VocabList({ genreName }: { genreName: string }) {
    const genreAndVocab = useGenreAndVocab(genreName);

    return (
        <div
            css={{
                marginBottom: 30,
                textAlign: "center",
                textShadow: "initial",
            }}
        >
            <VList
                g={genreAndVocab.vocabGenre}
                vocabList={genreAndVocab.vocabList}
                style={{ marginBottom: 5 }}
            />
            <ATargetBlank
                href={`${Z_APPS_TOP_URL}/vocabulary-list#${encodeURIComponent(
                    genreAndVocab.vocabGenre.genreName
                )}`}
                style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                    ...linkShadowStyle,
                }}
            >
                {"Check all vocab lists >>"}
            </ATargetBlank>
        </div>
    );
}

function useGenreAndVocab(genreName: string) {
    const [genreAndVocab, setGenreAndVocab] = useState<GenreAndVocab>({
        vocabGenre: initialVocabGenre,
        vocabList: [],
    });

    useEffect(() => {
        let unmounted = false;
        if (genreName) {
            const load = async () => {
                const result = await fetchGenreAndVocab(genreName);
                if (!unmounted && result) {
                    setGenreAndVocab(result);
                }
            };
            void load();
        }
        return () => {
            unmounted = true;
        };
    }, [genreName]);

    return genreAndVocab;
}

export interface GenreAndVocab {
    vocabGenre: vocabGenre;
    vocabList: vocab[];
}
async function fetchGenreAndVocab(
    genreName: string
): Promise<GenreAndVocab | null> {
    try {
        const result = await fetchGet<GetQuizDataWithoutCache>(
            "/api/zApps/vocabQuiz/getQuizDataWithoutCache",
            { genreName }
        );
        if (result.responseType === "system_error") {
            return null;
        }
        return result;
    } catch (ex) {
        return null;
    }
}
