import { SerializedStyles } from "@emotion/react";
import React, { AnchorHTMLAttributes, useEffect, useState } from "react";
import { YOUTUBE_CHANNEL_URL } from "../../../const/public";
import { useAppState } from "../../../lib/appState";
import { LinkProps, Link as LinkWithoutYouTube } from "./Link";

const seenVideoStorageKey = "seenVideoStorageKey-";
const youTubeVideoUrls = {
    beginner_grammar1: "https://youtu.be/6gdQS1djlL8",
    how_to_say_you: "https://youtu.be/CHFBq9xjOD4",
    how_to_say_do: "https://youtu.be/K1sDYLPunJ8",
    channel_page: YOUTUBE_CHANNEL_URL,
} as const;

function recentlyAccessed(strSavedDate: string | null): boolean {
    if (strSavedDate) {
        const date = new Date(strSavedDate);
        const dif = new Date().getTime() - date.getTime();
        if (dif < 1000 * 60 * 60 * 24) {
            // Accessed within 24 hour
            return true;
        }
    }
    return false;
}

export function Link(props: LinkProps) {
    const unseenVideo = useUnseenVideo();
    const [isNoYouTubeAdMode] = useAppState("isNoYouTubeAdMode");

    if (unseenVideo && !isNoYouTubeAdMode) {
        const { onClick, pCss, ...rest } = props;
        return (
            <a
                target="_blank"
                rel={"noopener noreferrer"}
                {...rest}
                onClick={(...args) => {
                    onClick?.(...args);
                    setTimeout(() => {
                        location.href = youTubeVideoUrls[unseenVideo];
                    }, 1000);
                    localStorage.setItem(
                        seenVideoStorageKey + unseenVideo,
                        new Date().toISOString()
                    );
                }}
                css={pCss}
            />
        );
    }
    return <LinkWithoutYouTube {...props} />;
}

export function A(
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { pCss?: SerializedStyles }
) {
    const unseenVideo = useUnseenVideo();
    const [isNoYouTubeAdMode] = useAppState("isNoYouTubeAdMode");

    if (unseenVideo && !isNoYouTubeAdMode) {
        const { onClick, pCss, ...rest } = props;
        return (
            <a
                target="_blank"
                rel={"noopener noreferrer"}
                {...rest}
                onClick={(...args) => {
                    onClick?.(...args);
                    setTimeout(() => {
                        location.href = youTubeVideoUrls[unseenVideo];
                    }, 1000);
                    localStorage.setItem(
                        seenVideoStorageKey + unseenVideo,
                        new Date().toISOString()
                    );
                }}
                css={pCss}
            />
        );
    }
    const { pCss, ...rest } = props;
    return <a {...rest} css={pCss} />;
}

type UnseenVideoState = {
    unseenVideo: keyof typeof youTubeVideoUrls | null;
} | null;
let unseenVideoState: UnseenVideoState = null;

function useUnseenVideo() {
    const [videoState, setVideoState] = useState<UnseenVideoState>(null);

    useEffect(() => {
        if (window.navigator.userAgent.toLowerCase().includes("bot")) {
            setVideoState(null);
            return;
        }

        if (unseenVideoState) {
            // already checked by another component
            setVideoState(unseenVideoState);
            return; // return not to access localStorage again and again
        }

        const v = Object.keys(youTubeVideoUrls).find(
            k =>
                !recentlyAccessed(localStorage.getItem(seenVideoStorageKey + k))
        ) as keyof typeof youTubeVideoUrls | null;

        unseenVideoState = { unseenVideo: v };
        setVideoState(unseenVideoState);
    }, []);

    return videoState?.unseenVideo;
}
