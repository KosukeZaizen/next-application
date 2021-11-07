import { css } from "@emotion/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { appsPublicImg } from "../../../const/public";
import { fetchGet } from "../../../lib/fetch";
import { GetFallingImages } from "../../../pages/api/zApps/fallingImage/getFallingImages";
import { FallingImage } from "./type";

let count = 0;
let ls: Leaf[] = [];
let intervalId = 0;

interface Leaf {
    id: number;
    ageCount: number;
    initialX: number;
}

interface Props {
    frequencySec: number;
    screenWidth: number;
    screenHeight: number;
    season?: string;
    isFestivalHidden?: boolean;
}
export const SeasonAnimation = ({
    frequencySec,
    screenWidth,
    screenHeight,
    season: pSeason,
    isFestivalHidden,
}: Props) => {
    const [scale, setScale] = useState(0);
    const [leaves, setLeaves] = useState<Leaf[]>([]);
    const [season, setSeason] = useState<string>("none");
    const [seasonItems, setSeasonItems] = useState<FallingImage[]>([]);

    useEffect(() => {
        const load = async () => {
            if (pSeason === "none") {
                return;
            }
            const fallingImages = await getFallingImages();
            setSeasonItems(fallingImages);

            if (pSeason) {
                if (fallingImages.some(im => im.name === pSeason)) {
                    setSeason(pSeason);
                } else {
                    setSeason("none");
                }
            } else {
                const month = new Date().getMonth() + 1;
                if (9 <= month && month <= 11) {
                    //秋
                    setSeason("autumn");
                } else if (12 === month || month <= 2) {
                    //冬
                    setSeason("winter");
                } else if (3 <= month && month <= 4) {
                    //春
                    setSeason("spring");
                } else {
                    //夏
                    setSeason("summer");
                }
            }
        };
        load();
    }, [pSeason]);

    useEffect(() => {
        setScale((screenWidth + screenHeight) / 1000);

        if (intervalId) {
            clearInterval(intervalId); // clear old interval
        }

        intervalId = window.setInterval(() => {
            //各葉っぱは20秒で消える
            const newLeaves = ls
                .map(l => ({ ...l, ageCount: l.ageCount + 1 }))
                .filter(l => l.ageCount <= 20);

            count++;
            if (count % frequencySec === 0) {
                newLeaves.push({
                    id: count,
                    ageCount: 0,
                    initialX: (screenWidth / 6) * (Math.random() * 11),
                });
            }

            setLeaves(newLeaves);
            ls = newLeaves;
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [screenWidth, screenHeight, frequencySec]);

    useEffect(() => {
        return () => {
            ls = [];
        };
    }, []);

    return (
        <>
            {!isFestivalHidden && (
                <img
                    alt="japanese festival"
                    title="japanese festival"
                    src={appsPublicImg + "japanese-festival.png"}
                    css={{
                        position: "absolute",
                        width: "128%",
                        top: 80 - screenWidth * 0.34,
                        left: -(screenWidth * 0.28),
                        zIndex: -110,
                    }}
                />
            )}
            <FallingImages
                seasonItems={seasonItems}
                season={season}
                leaves={leaves}
                scale={scale}
            />
        </>
    );
};

export async function getFallingImages(): Promise<FallingImage[]> {
    const response = await fetchGet<GetFallingImages>(
        "/api/zApps/fallingImage/getFallingImages",
        {}
    );
    if (response.responseType === "system_error") {
        return [];
    }

    return response.data;
}

function FallingImages({
    seasonItems,
    season,
    leaves,
    scale,
}: {
    seasonItems: FallingImage[];
    season: string;
    leaves: Leaf[];
    scale: number;
}) {
    const seasonItem = seasonItems?.find(item => item.name === season);

    if (!season || season === "none" || !seasonItem) {
        return null;
    }
    return (
        <>
            {leaves.map(l => (
                <FallingImage
                    key={l.id}
                    seasonItem={seasonItem}
                    scale={scale}
                    l={l}
                />
            ))}
        </>
    );
}

function FallingImage({
    l,
    seasonItem,
    scale,
}: {
    l: Leaf;
    seasonItem: FallingImage;
    scale: number;
}) {
    return (
        <img
            src={appsPublicImg + seasonItem.fileName}
            alt={`${seasonItem.alt} ${l.id}`}
            title={`${seasonItem.alt} ${l.id}`}
            css={css`
                will-change: animation;
                backface-visibility: hidden;
                max-width: ${50 * scale}px;
                max-height: ${50 * scale}px;
                position: fixed;
                top: ${-1.5 * 90 * scale}px;
                left: ${l.initialX}px;
                z-index: -100;
                ${fallingAnimation}
            `}
        />
    );
}

const fallingAnimation = `
@media only screen and (max-width: 600px) {
    animation: fallSmall 40s 1s ease-out;
}
@media only screen and (min-width: 601px) {
    animation: fall 25s 1s ease-out;
}
@keyframes fallSmall {
    0% {
        transform: translate(0px, 0px) rotate(0deg);
    }
    100% {
        transform: translate(-1000px, 2000px)
            rotate(2000deg);
    }
}
@keyframes fall {
    0% {
        transform: translate(0px, 0px) rotate(0deg);
    }
    100% {
        transform: translate(-1000px, 2000px)
            rotate(1000deg);
    }
}
`;
