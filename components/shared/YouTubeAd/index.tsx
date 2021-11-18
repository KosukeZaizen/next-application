import { SerializedStyles } from "@emotion/utils";
import React from "react";
import { BLOB_URL } from "../../../const/public";
import { getClasses } from "../../../lib/css";
import { ATargetBlank } from "../Link/ATargetBlank";

export const YouTubeAd = ({
    width,
    style,
}: {
    width?: number | string;
    style?: SerializedStyles;
}) => (
    <ATargetBlank
        nofollow
        href="http://www.youtube.com/channel/UCii35PcojqMUNkSRalUw35g?sub_confirmation=1"
        css={[cs.width500, style]}
    >
        <img
            src={`${BLOB_URL}/appsPublic/ad/ad1.png`}
            alt="Lingual Ninja YouTube Channel"
            css={{
                margin: "7px auto",
                width: width || "100%",
            }}
        />
    </ATargetBlank>
);

const cs = getClasses({
    width500: {
        maxWidth: 500,
        width: "100%",
    },
});
