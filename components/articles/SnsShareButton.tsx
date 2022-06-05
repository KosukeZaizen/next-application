import { SerializedStyles } from "@emotion/utils";
import * as React from "react";
import { BLOB_URL } from "../../const/public";
import { ATargetBlank } from "../shared/Link/ATargetBlank";

type TFBProps = {
    urlToShare: string;
    imgStyle?: SerializedStyles;
    containerStyle?: SerializedStyles;
};
export const FBShareBtn = ({
    urlToShare,
    imgStyle,
    containerStyle,
}: TFBProps) => {
    return (
        <ATargetBlank
            href={`https://www.facebook.com/share.php?u=${urlToShare}`}
            nofollow
            pCss={containerStyle}
        >
            <img
                src={BLOB_URL + "/vocabulary-quiz/img/shareOnFacebook.png"}
                alt="Share on Facebook"
                css={imgStyle}
            />
        </ATargetBlank>
    );
};

type TTWProps = {
    urlToShare: string;
    textToShare: string;
    imgStyle?: SerializedStyles;
    containerStyle?: SerializedStyles;
};
export const TwitterShareBtn = ({
    urlToShare,
    textToShare,
    imgStyle,
    containerStyle,
}: TTWProps) => {
    return (
        <ATargetBlank
            href={`https://twitter.com/share?url=${urlToShare}&text=${textToShare}&hashtags=nihongo,Japanese,LingualNinja`}
            nofollow
            pCss={containerStyle}
        >
            <img
                src={BLOB_URL + "/vocabulary-quiz/img/shareOnTwitter.png"}
                alt="Share on Twitter"
                css={imgStyle}
            />
        </ATargetBlank>
    );
};
