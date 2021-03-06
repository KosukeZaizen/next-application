import { css } from "@emotion/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { APPS_PUBLIC_IMG_URL } from "../../../const/public";
import { fetchGet } from "../../../lib/fetch";
import { GetFallingImages } from "../../../pages/api/zApps/fallingImage/getFallingImages";
import { Img } from "../Img";
import { FallingImage } from "./type";

const festivalImgPath = APPS_PUBLIC_IMG_URL + "japanese-festival.png";

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

    const festivalWidth = screenWidth * 1.28;
    const festivalHeight = festivalWidth * (21 / 48);

    return (
        <>
            {!isFestivalHidden && (
                <div
                    css={css`
                        position: absolute;
                        top: ${70 - screenWidth * 0.33}px;
                        left: ${-(screenWidth * 0.28)}px;
                        z-index: -110;
                    `}
                >
                    <img
                        alt="japanese festival"
                        src={festivalImgPath}
                        loading="eager"
                        css={{ width: festivalWidth, height: festivalHeight }}
                    />
                </div>
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
        <div css={fallingAnimation}>
            {leaves.map(l => (
                <FallingImg
                    key={l.id}
                    seasonItem={seasonItem}
                    scale={scale}
                    l={l}
                />
            ))}
        </div>
    );
}

function FallingImg({
    l,
    seasonItem,
    scale,
}: {
    l: Leaf;
    seasonItem: FallingImage;
    scale: number;
}) {
    return (
        <div
            style={{
                top: -1.5 * 90 * scale,
                left: l.initialX,
                overflow: "visible",
            }}
            className="fallingImg"
        >
            <Img
                src={APPS_PUBLIC_IMG_URL + seasonItem.fileName}
                alt={`${seasonItem.alt} ${l.id}`}
                title={`${seasonItem.alt} ${l.id}`}
                layout="fixed"
                width={50 * scale}
                height={50 * scale}
                objectFit="contain"
                objectPosition="50% 50%"
            />
        </div>
    );
}

const fallingAnimation = css`
    & .fallingImg {
        will-change: animation;
        backface-visibility: hidden;
        position: fixed;
        z-index: -100;
    }
    @media only screen and (max-width: 600px) {
        & .fallingImg {
            animation: fallSmall 40s 1s ease-out;
        }
    }
    @media only screen and (min-width: 601px) {
        & .fallingImg {
            animation: fall 25s 1s ease-out;
        }
    }
    @keyframes fallSmall {
        0% {
            transform: translate(0px, 0px) rotate(0deg);
        }
        100% {
            transform: translate(-1000px, 2000px) rotate(2000deg);
        }
    }
    @keyframes fall {
        0% {
            transform: translate(0px, 0px) rotate(0deg);
        }
        100% {
            transform: translate(-1000px, 2000px) rotate(1000deg);
        }
    }
`;
