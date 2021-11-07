import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Img } from "../../../shared/Img";
import { YouTubeVideo } from "../../../shared/YouTubeVideo";
import { Speaker } from "./Speaker";
import { VocabList } from "./VocabList";

const imgExtensions = [".png", ".jpg"];
const soundExtensions = [".m4a"];

export function checkImgExtension(str: string) {
    if (!str) {
        return false;
    }
    return imgExtensions.some(e => str.toLowerCase().includes(e));
}

function checkSoundExtension(str: string) {
    if (!str) {
        return false;
    }
    return soundExtensions.some(e => str.toLowerCase().includes(e));
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
    } else if (checkSoundExtension(src)) {
        return <Speaker src={src} alt={alt} />;
    } else if (src === "vocab") {
        return <VocabList genreName={alt} />;
    }
    // return (
    //     <Img
    //         src={src}
    //         alt={alt}
    //         title={alt}
    //         className={styles.renderedImg}
    //         layout="responsive"
    //         width="100%"
    //         height="10%"
    //         objectFit="cover"
    //     />
    // );
    return <Img src={src} alt={alt} title={alt} pCss={imgCss} />;
};

const imgCss = css`
    display: inline-block;
    margin: 0px auto 20px;
    width: 100%;
    max-height: 450px;
    position: relative;
    filter: drop-shadow(0 0 3px white) drop-shadow(0 0 6px white)
        drop-shadow(0 0 9px white) drop-shadow(0 0 10px white);
    overflow: hidden;
`;
