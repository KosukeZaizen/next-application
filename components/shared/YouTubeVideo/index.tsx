import React, { CSSProperties } from "react";
import { ATargetBlank } from "../ATargetBlank";

export function YouTubeVideo({
    videoId,
    screenWidth,
    style,
    buttonLabel,
}: {
    videoId: string;
    screenWidth: number;
    style?: CSSProperties;
    buttonLabel?: string;
}) {
    const isWide = screenWidth > 600;
    return (
        <div
            style={{
                backgroundColor: isWide ? "rgb(231, 233, 231)" : undefined,
                padding: "5px 0",
                border: 0,
                ...style,
            }}
        >
            <div style={{ maxWidth: 600 }}>
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "56.25%",
                    }}
                >
                    <iframe
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "100%",
                            height: "100%",
                        }}
                        src={"https://www.youtube.com/embed/" + videoId}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <ATargetBlank
                    nofollow
                    href="http://www.youtube.com/channel/UCii35PcojqMUNkSRalUw35g?sub_confirmation=1"
                >
                    <button
                        css={{
                            marginTop: 5,
                            width: "100%",
                            backgroundColor: "red",
                            color: "white",
                            "&:hover": {
                                opacity: 0.5,
                                backgroundColor: "red",
                            },
                        }}
                        className="btn btn-danger"
                    >
                        {buttonLabel ||
                            "Click to subscribe to this YouTube channel!"}
                    </button>
                </ATargetBlank>
            </div>
        </div>
    );
}
