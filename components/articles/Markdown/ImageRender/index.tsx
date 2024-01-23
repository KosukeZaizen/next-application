import React, { useEffect, useState } from "react";
import { css } from "../../../../lib/css";
import { LazyLoad } from "../../../shared/LazyLoad";
import { Video, YouTubeVideo } from "../../../shared/YouTubeVideo";
import { Speaker } from "./Speaker";
import { VocabList } from "./VocabList";
import { AudioControl } from "./AudioControl";

const imgExtensions = [".png", ".jpg", ".gif"];
const soundExtensions = [".m4a"];
const videoExtensions = [".mp4"];

export function checkImgExtension(str: string) {
    return checkExtension(str, imgExtensions);
}

function checkExtension(str: string, extensions: string[]) {
    if (!str) {
        return false;
    }
    return extensions.some(e => str.toLowerCase().includes(e));
}

export const ImageRender = ({ src, alt }: { src?: string; alt?: string }) => {
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    if (!src || !alt) {
        return null;
    }

    if (src.startsWith("youtube")) {
        return (
            <YouTubeVideo
                screenWidth={screenWidth}
                videoId={alt}
                buttonLabel={
                    src.includes("-")
                        ? src.split("-")[1].split("_").join(" ")
                        : ""
                }
            />
        );
    } else if (checkExtension(src, soundExtensions)) {
        if (alt === "progress") {
            return <AudioControl audioPath={src} />;
        }
        return (
            <LazyLoad>
                <Speaker src={src} alt={alt} />
            </LazyLoad>
        );
    } else if (checkExtension(src, videoExtensions)) {
        return (
            <LazyLoad>
                <Video src={src} screenWidth={screenWidth} />
            </LazyLoad>
        );
    } else if (src === "vocab") {
        return <VocabList genreName={alt} />;
    }
    return (
        <LazyLoad>
            <img src={src} alt={alt} title={alt} css={imgInArticleStyle} />
        </LazyLoad>
    );
};

export const imgInArticleStyle = css({
    filter: "drop-shadow(0 0 3px white) drop-shadow(0 0 6px white) drop-shadow(0 0 9px white) drop-shadow(0 0 10px white)",
    margin: "0px auto 20px",
    maxHeight: 450,
    width: "100%",
    objectFit: "contain",
    objectPosition: "50% 50%",
});
