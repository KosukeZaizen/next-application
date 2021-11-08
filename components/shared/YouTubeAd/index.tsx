import React from "react";
import { BLOB_URL } from "../../../const/public";
import { Css, getClasses } from "../../../lib/css";
import { ATargetBlank } from "../ATargetBlank";

export const YouTubeAd = ({
    width,
    style,
}: {
    width?: number | string;
    style?: Css;
}) => (
    <ATargetBlank
        nofollow
        href="http://www.youtube.com/channel/UCii35PcojqMUNkSRalUw35g?sub_confirmation=1"
        css={[cs.width500, style]}
    >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src={`${BLOB_URL}/appsPublic/ad/ad1.png`}
            alt="Lingual Ninja YouTube Channel"
            css={{
                width: width || "100%",
                height: "auto",
                margin: "7px 0",
            }}
        />
    </ATargetBlank>
);

const cs = getClasses({ width500: { maxWidth: 500 } });
