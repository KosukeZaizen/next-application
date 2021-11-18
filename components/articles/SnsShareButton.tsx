import { SerializedStyles } from "@emotion/utils";
import * as React from "react";
import { BLOB_URL } from "../../const/public";
import { ATargetBlank } from "../shared/Link/ATargetBlank";

type TFBProps = {
    style: SerializedStyles;
    urlToShare: string;
};
export const FBShareBtn = ({ style, urlToShare }: TFBProps) => {
    return (
        <ATargetBlank
            href={`https://www.facebook.com/share.php?u=${urlToShare}`}
            nofollow
        >
            <img
                src={BLOB_URL + "/vocabulary-quiz/img/shareOnFacebook.png"}
                alt="Share on Facebook"
                css={style}
            />
        </ATargetBlank>
    );
};

type TTWProps = {
    style: SerializedStyles;
    urlToShare: string;
    textToShare: string;
};
export const TwitterShareBtn = (props: TTWProps) => {
    const { style, urlToShare, textToShare } = props;

    return (
        <ATargetBlank
            href={`https://twitter.com/share?url=${urlToShare}&text=${textToShare}&hashtags=nihongo,Japanese,LingualNinja`}
            nofollow
        >
            <img
                src={BLOB_URL + "/vocabulary-quiz/img/shareOnTwitter.png"}
                alt="Share on Twitter"
                css={style}
            />
        </ATargetBlank>
    );
};
