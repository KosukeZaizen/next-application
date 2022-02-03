import { apiGet } from "../../../lib/nextApi";
import { GetParams } from "../../../types/next";
import { YAHOO_APP_ID } from "../../../const/private";

export interface YahooFuriganaV1 {
    url: "/api/japaneseDictionary/yahooFuriganaV1";
    params: Params;
    response: Response;
}
type Params = { word: string };
type Response = {
    xml: string;
};

const handler = async ({ word }: GetParams<Params>): Promise<Response> => {
    try {
        if (typeof word !== "string") {
            return { xml: "" };
        }

        const v2Json = await getYahooFuriganaV2Json(word);

        return { xml: convertIntoV1XML(v2Json) };
    } catch (error) {
        return { xml: "" };
    }
};

async function getYahooFuriganaV2Json(word: string): Promise<V2Json> {
    const headers = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": YAHOO_APP_ID,
    });
    return await (
        await fetch("https://jlp.yahooapis.jp/FuriganaService/V2/furigana", {
            headers,
            method: "POST",
            body: JSON.stringify({
                id: word,
                jsonrpc: "2.0",
                method: "jlp.furiganaservice.furigana",
                params: {
                    q: decodeURIComponent(word),
                },
            }),
        })
    ).json();
}

interface WordInfo {
    furigana: string;
    roman: string;
    subword?: {
        furigana: string;
        roman: string;
        surface: string;
    }[];
    surface: string;
}
type V2Json = {
    id: string;
    jsonrpc: "2.0";
    result: {
        word: WordInfo[];
    };
};

function convertIntoV1XML({ result: { word } }: V2Json) {
    const wordContents = word.reduce((acc, val) => {
        return (
            acc +
            `
            <Word>
                ${getRow("Surface", val)}
                ${getRow("Furigana", val)}
                ${getRow("Roman", val)}
                ${
                    val.subword
                        ? `<SubWordList>
                            ${val.subword.reduce((acc, subVal) => {
                                return (
                                    acc +
                                    `
                                    <SubWord>
                                        ${getRow("Surface", subVal)}
                                        ${getRow("Furigana", subVal)}
                                        ${getRow("Roman", subVal)}
                                    </SubWord>`
                                );
                            }, "")}
                            </SubWordList>`
                        : ""
                }
            </Word>`
        );
    }, "");

    return setXmlTemplate(wordContents);
}

function getRow(attributeName: string, val: WordInfo) {
    const value = val[attributeName.toLowerCase() as keyof WordInfo];
    if (value) {
        return `<${attributeName}>${value}</${attributeName}>`;
    }
    return "";
}

function setXmlTemplate(wordContents: string) {
    return `<?xml version="1.0" encoding="UTF-8"?><ResultSet xmlns="urn:yahoo:jp:jlp:FuriganaService" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:yahoo:jp:jlp:FuriganaService https://jlp.yahooapis.jp/FuriganaService/V1/furigana.xsd"><Result><WordList>${wordContents}</WordList></Result></ResultSet>`;
}

export default apiGet<YahooFuriganaV1>(handler);
