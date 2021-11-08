import React, { useEffect, useState } from "react";
import { ExampleSentence } from ".";
import { BLOB_URL, Z_APPS_TOP_URL } from "../../../../../const/public";
import { c } from "../../../../../lib/css";
import { fetchGet } from "../../../../../lib/fetch";
import { GetOneSentence } from "../../../../../pages/api/zApps/folktales/getOneSentence";
import { sentence, word } from "../../../../../types/stories";
import { ATargetBlank } from "../../../../shared/ATargetBlank";
import styles from "../../index.module.css";

export function FolktaleExample({
    storyName,
    lineNumber,
    boldInfo,
}: {
    storyName: string;
    lineNumber: number;
    boldInfo: string;
}) {
    const [s, setSentence] = useState<sentence>({
        storyId: 0,
        lineNumber: 0,
        kanji: "Loading...",
        hiragana: "Loading...",
        romaji: "Loading...",
        english: "Loading...",
    });
    const [words, setWords] = useState<word[]>([
        {
            lineNumber: 0,
            wordNumber: 0,
            kanji: "loading...",
            hiragana: "loading...",
            english: "loading...",
        },
    ]);

    useEffect(() => {
        const fetchSentence = async () => {
            const result = await fetchGet<GetOneSentence>(
                "/api/zApps/folktales/getOneSentence",
                { storyName, lineNumber }
            );
            if (result.responseType !== "success") {
                return;
            }
            const { sentence, words } = result;
            setSentence(sentence);
            setWords(words);
        };
        storyName && lineNumber && fetchSentence();
    }, [storyName, lineNumber]);

    const audioFolder = storyName?.split("--")[0];
    const id = `${storyName}-${s.lineNumber}`;
    const folktaleTitle = storyName
        .split("--")
        .join(" - ")
        .split("_")
        .join(" ");

    return (
        <div id={id} key={id} css={containerStyle}>
            <img
                src={`${BLOB_URL}/folktalesImg/${storyName.split("--")[0]}.png`}
                alt={folktaleTitle}
                title={folktaleTitle}
                className={styles.renderedImg}
            />
            <div css={explanationStyle}>
                {"Below is a sentence from the folktale "}
                <ATargetBlank
                    href={`${Z_APPS_TOP_URL}/folktales/${storyName}`}
                >{`${folktaleTitle}>>`}</ATargetBlank>
            </div>
            <ExampleSentence
                s={s}
                boldInfo={boldInfo}
                words={words}
                audioPath={`${BLOB_URL}/folktalesAudio/${audioFolder}/folktale-audio${s.lineNumber}.m4a`}
            />
        </div>
    );
}

const containerStyle = c({ marginBottom: 25, textShadow: "initial" });
const explanationStyle = c({ fontWeight: "bold", marginBottom: 20 });
