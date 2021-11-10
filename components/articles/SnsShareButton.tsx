import { SerializedStyles } from "@emotion/utils";
import * as React from "react";
import { BLOB_URL } from "../../const/public";
import { Img } from "../shared/Img";
import { ATargetBlank } from "../shared/Link/ATargetBlank";

type TFBProps = {
    style: SerializedStyles;
    urlToShare: string;
};
export const FBShareBtn = (props: TFBProps) => {
    const { style, urlToShare } = props;

    return (
        <ATargetBlank
            href={`https://www.facebook.com/share.php?u=${urlToShare}`}
            nofollow
        >
            <Img
                src={BLOB_URL + "/vocabulary-quiz/img/shareOnFacebook.png"}
                alt="Share on Facebook"
                containerStyle={style}
                layout="intrinsic"
                width={200}
                height={32}
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
            <Img
                src={BLOB_URL + "/vocabulary-quiz/img/shareOnTwitter.png"}
                alt="Share on Twitter"
                containerStyle={style}
                layout="intrinsic"
                width={200}
                height={32}
            />
        </ATargetBlank>
    );
};
