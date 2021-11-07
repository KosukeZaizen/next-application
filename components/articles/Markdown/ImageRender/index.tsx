import React, { useEffect, useState } from "react";
import { YouTubeVideo } from "../../../shared/YouTubeVideo";
import styles from "../index.module.css";
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
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} title={alt} className={styles.renderedImg} />
    );
};
