import { SerializedStyles } from "@emotion/utils";
import React from "react";
import { BLOB_URL } from "../../../const/public";
import { css, getClasses } from "../../../lib/css";
import { AutoHeightImg } from "../Img";
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
        <AutoHeightImg
            src={`${BLOB_URL}/appsPublic/ad/ad1.png`}
            alt="Lingual Ninja YouTube Channel"
            containerStyle={css({
                margin: "7px auto",
            })}
            width={width || "100%"}
        />
    </ATargetBlank>
);

const cs = getClasses({
    width500: {
        maxWidth: 500,
        width: "100%",
    },
});
