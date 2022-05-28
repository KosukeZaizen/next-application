import { css, SerializedStyles } from "@emotion/react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useIsFirstRender } from "../../lib/hooks/useIsFirstRender";
import FooterAnimation from "../shared/FooterAnimation";
import { Helmet, HelmetProps } from "../shared/Helmet";
import { Link } from "../shared/Link/Link";
import { RightPanel } from "../shared/RightPanel";
import { SeasonAnimation } from "../shared/SeasonAnimation";
import ShurikenProgress from "../shared/ShurikenProgress";
import { PopupAd } from "../shared/YouTubeAd/Popup";
import { Author, AuthorArea } from "./Author";

const styles = {
    toolBar: {
        display: "flex",
        justifyContent: "center",
    },
} as const;

interface Props {
    children: React.ReactNode;
    screenWidth: number;
    screenHeight: number;
    helmetProps: HelmetProps;
    noSeasonAnimation?: boolean;
    author?: Author;
    maxWidth: number;
}

let previousScrollY = 0;
let isHidden = false;

export function Layout({
    children,
    screenWidth,
    screenHeight,
    helmetProps,
    noSeasonAnimation,
    author,
    maxWidth,
}: Props) {
    useEffect(() => {
        const { style } = window.document.body;
        style.overflowY = "auto";
        style.overflowX = "hidden";
    }, []);

    const [hideAppBar, setHideAppBar] = useState(false);
    useEffect(() => {
        const scrollHandler = () => {
            const isRapidScroll = window.scrollY > previousScrollY + 500;
            previousScrollY = window.scrollY;

            if (window.scrollY < 100) {
                setHideAppBar(false);
                return;
            }

            if (isHidden) {
                return;
            }

            if (!isRapidScroll) {
                return;
            }

            setHideAppBar(true);
            isHidden = true;
            setTimeout(() => {
                setHideAppBar(false);
                isHidden = false;
            }, 5000);
        };

        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    const { isFirstRender } = useIsFirstRender();

    const isWide = screenWidth > 600;

    return (
        <>
            <Helmet {...helmetProps} />
            <AppBar
                position="static"
                style={{
                    backgroundColor: "rgb(34, 34, 34)",
                    marginBottom: 20,
                    position: "fixed",
                    top: hideAppBar ? -100 : -1,
                    transitionDuration: "1s",
                    transitionProperty: "top",
                    width: "100%",
                }}
            >
                <Toolbar style={styles.toolBar}>
                    <div
                        css={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            maxWidth,
                        }}
                    >
                        <Title
                            isWide={isWide}
                            href={"https://www.lingual-ninja.com"}
                        />
                        {author ? (
                            <AuthorButton
                                author={author}
                                screenWidth={screenWidth}
                                isWide={isWide}
                            />
                        ) : (
                            <a
                                css={{
                                    fontSize: isWide ? "large" : "medium",
                                    color: "white",
                                    "&:hover": {
                                        opacity: 0.5,
                                        color: "white",
                                    },
                                }}
                                href={"https://www.lingual-ninja.com"}
                            >
                                {"Apps"}
                            </a>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            {isFirstRender ? (
                <FullScreenShuriken
                    style={css({ marginTop: isWide ? 134 : 126 })}
                />
            ) : (
                <>
                    <div
                        css={[
                            mainContainerStyle,
                            { marginTop: isWide ? 70 : 61 },
                        ]}
                    >
                        {children}
                    </div>
                    {!noSeasonAnimation && (
                        <SeasonAnimation
                            frequencySec={2}
                            screenWidth={screenWidth}
                            screenHeight={screenHeight}
                        />
                    )}
                    <FooterAnimation />
                    <PopupAd />
                </>
            )}
        </>
    );
}

export function FullScreenShuriken({ style }: { style?: SerializedStyles }) {
    return (
        <div css={[shurikenContainerStyle, style]}>
            <ShurikenProgress size="100%" style={shurikenStyle} />
        </div>
    );
}

function Title({ isWide, href }: { isWide: boolean; href: string }) {
    return (
        <Link href={href}>
            <Typography
                variant="h4"
                style={{
                    flexGrow: 1,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: isWide ? undefined : "x-large",
                }}
                css={{
                    "&:hover": {
                        opacity: 0.5,
                        color: "white",
                    },
                }}
            >
                Lingual Ninja
            </Typography>
        </Link>
    );
}

const maxAuthorPanelWidth = 1000;

function AuthorButton({
    author,
    screenWidth,
    isWide,
}: {
    author: Author;
    screenWidth: number;
    isWide: boolean;
}) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const panelWidth =
        screenWidth > maxAuthorPanelWidth ? maxAuthorPanelWidth : screenWidth;

    return (
        <>
            <div
                onClick={() => {
                    setIsPanelOpen(true);
                }}
                css={{
                    cursor: "pointer",
                    fontSize: isWide ? "large" : "medium",
                    "&:hover": {
                        opacity: 0.5,
                    },
                }}
            >
                {"Author"}
            </div>
            <RightPanel
                open={isPanelOpen}
                onClose={() => {
                    setIsPanelOpen(false);
                }}
                screenWidth={screenWidth}
                panelWidth={maxAuthorPanelWidth}
            >
                <AuthorArea author={author} screenWidth={panelWidth} />
            </RightPanel>
        </>
    );
}

const shurikenStyle = css({
    maxWidth: 200,
    width: "20%",
});

const shurikenContainerStyle = css({
    marginTop: 50,
    zIndex: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export const whiteShadowStyle = css({
    textShadow: `0px 0px 1px white, 0px 0px 2px white, 0px 0px 3px white,
        0px 0px 4px white, 0px 0px 5px white, 0px 0px 5px white,
        0px 0px 5px white, 0px 0px 5px white, 0px 0px 5px white,
        0px 0px 5px white, 0px 0px 5px white, 0px 0px 5px white,
        0px 0px 5px white, 0px 0px 5px white, 0px 0px 5px white,
        0px 0px 6px white, 1px 1px 6px white, -1px 1px 6px white,
        1px -1px 6px white, -1px -1px 6px white, 2px 2px 6px white,
        -2px 2px 6px white, 2px -2px 6px white, -2px -2px 6px white,
        3px 3px 6px white, -3px 3px 6px white, 3px -3px 6px white,
        -3px -3px 6px white, 0px 0px 8px white, 1px 1px 8px white,
        -1px 1px 8px white, 1px -1px 8px white, -1px -1px 8px white,
        2px 2px 8px white, -2px 2px 8px white, 2px -2px 8px white,
        -2px -2px 8px white, 3px 3px 8px white, -3px 3px 8px white,
        3px -3px 8px white, -3px -3px 8px white, 0px 0px 10px white,
        1px 1px 10px white, -1px 1px 10px white, 1px -1px 10px white,
        -1px -1px 10px white, 2px 2px 10px white, -2px 2px 10px white,
        2px -2px 10px white, -2px -2px 10px white, 3px 3px 10px white,
        -3px 3px 10px white, 3px -3px 10px white, -3px -3px 10px white,
        3px 3px 10px white, -3px 3px 10px white, 3px -3px 10px white,
        -3px -3px 10px white`,
});

const centerStyle = css`
    & > * {
        margin-right: auto;
        margin-left: auto;
    }
`;

export const h1TitleCss = css`
    margin: 25px auto 30px;
    text-align: center;
    line-height: 1.3;
    ${whiteShadowStyle}
`;

const mainContainerStyle = css(
    {
        marginRight: 10,
        marginLeft: 10,
    },
    centerStyle
);

export function getImgNumber(num = 0) {
    const today = new Date();
    const todayNumber = today.getMonth() + today.getDate() + num;
    const mod = todayNumber % 30;
    if (mod > 19) return 2;
    if (mod > 17) return 3;
    return 1;
}
