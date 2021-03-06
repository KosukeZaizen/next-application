import React, { useEffect, useState } from "react";
import { getClasses } from "../../../../../lib/css";
import { sentence, word } from "../../../../../types/stories";
import { AudioControl } from "./AudioControl";
import { WordList } from "./WordList";

interface BoldInfo {
    K?: number[];
    H?: number[];
    R?: number[];
    E?: number[];
}
export function ExampleSentence({
    s,
    boldInfo,
    words,
    audioPath,
}: {
    s: sentence;
    boldInfo: string;
    words: word[];
    audioPath?: string;
}) {
    const [bold, setBold] = useState<BoldInfo>({});

    useEffect(() => {
        if (!boldInfo) {
            setBold({});
            return;
        }
        try {
            const objBold: BoldInfo = JSON.parse(
                boldInfo
                    .replace("K", '"K"')
                    .replace("H", '"H"')
                    .replace("R", '"R"')
                    .replace("E", '"E"')
            );
            setBold(objBold);
        } catch {
            // Do nothing
        }
    }, [boldInfo]);

    return (
        <>
            <span css={classes.langNames}>
                {s.kanji && (
                    <span css={classes.kanji}>
                        <b>K</b>: Kanji
                    </span>
                )}
                {s.hiragana && (
                    <span css={classes.hiragana}>
                        <b>H</b>: Hiragana
                    </span>
                )}
                {s.romaji && (
                    <span css={classes.romaji}>
                        <b>R</b>: Romaji
                    </span>
                )}
                {s.english && (
                    <span css={classes.english}>
                        <b>E</b>: English
                    </span>
                )}
            </span>
            {s.kanji && (
                <div css={classes.kanjiContainer}>
                    <div css={classes.langAbbr}>
                        <abbr title="kanji">Ｋ</abbr>:
                    </div>
                    <div css={classes.width100}>
                        {getBoldSentence(s.kanji, bold?.K)}
                    </div>
                </div>
            )}
            {s.hiragana && (
                <div css={classes.hiraganaContainer}>
                    <div css={classes.langAbbr}>
                        <abbr title="hiragana">Ｈ</abbr>:
                    </div>
                    <div css={classes.width100}>
                        {getBoldSentence(s.hiragana, bold?.H)}
                    </div>
                </div>
            )}
            {s.romaji && (
                <div css={classes.romajiContainer}>
                    <div css={classes.langAbbr}>
                        <abbr title="romaji">Ｒ</abbr>:
                    </div>
                    <div css={classes.width100}>
                        {getBoldSentence(s.romaji, bold?.R)}
                    </div>
                </div>
            )}
            {s.english && (
                <div css={classes.englishContainer}>
                    <div css={classes.langAbbr}>
                        <abbr title="english">Ｅ</abbr>:
                    </div>
                    <div css={classes.width100}>
                        {getBoldSentence(s.english, bold?.E)}
                    </div>
                </div>
            )}
            {audioPath && <AudioControl audioPath={audioPath} />}
            {words?.length > 0 && (
                <WordList
                    words={{ [s.lineNumber]: words }}
                    s={s}
                    storyId={s.storyId}
                />
            )}
        </>
    );
}

function getBoldSentence(sentence: string, minAndMax?: number[]) {
    if (!minAndMax || minAndMax.length % 2 !== 0) {
        return sentence;
    }

    const copyMinAndMax = [...minAndMax];
    const arrToShow = [];

    const firstPart = sentence.substr(0, copyMinAndMax[0]);

    while (copyMinAndMax.length > 0) {
        const min = copyMinAndMax.shift() || 0;
        const max = copyMinAndMax.shift() || 500;

        const strongPart = sentence.substr(min, max - min);
        const thirdPart = sentence.substr(
            max,
            (copyMinAndMax[0] || sentence.length) - max
        );
        arrToShow.push(
            <span key={min}>
                <strong css={classes.colorRed}>{strongPart}</strong>
                {thirdPart}
            </span>
        );
    }

    return (
        <>
            {firstPart}
            {arrToShow}
        </>
    );
}

const classes = getClasses({
    langNames: { fontSize: "small", marginBottom: 5 },
    kanji: {
        backgroundColor: "#fff0f2",
        padding: 2,
        margin: 3,
    },
    hiragana: {
        backgroundColor: "#ffffe0",
        padding: 2,
        margin: 3,
    },
    romaji: {
        backgroundColor: "#f0fff2",
        padding: 2,
        margin: 3,
    },
    english: {
        backgroundColor: "#f0f8ff",
        padding: 2,
        margin: 3,
    },
    colorRed: { color: "red" },
    width100: { width: "100%" },
    langAbbr: {
        fontWeight: "bold",
        marginRight: "1em",
    },
    kanjiContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fff0f2",
        borderRadius: 5,
    },
    hiraganaContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#ffffe0",
        borderRadius: 5,
    },
    romajiContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#f0fff2",
        borderRadius: 5,
    },
    englishContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#f0f8ff",
        borderRadius: 5,
    },
});
