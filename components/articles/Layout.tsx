import { css } from "@emotion/react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useIsFrontend } from "../../lib/hooks/useIsFrontend";
import { Helmet, HelmetProps } from "../shared/Helmet";
import { SeasonAnimation } from "../shared/SeasonAnimation";
import ShurikenProgress from "../shared/ShurikenProgress";
import { PopupAd } from "../shared/YouTubeAd/Popup";

const styles = {
    appBar: {
        backgroundColor: "rgb(34, 34, 34)",
        marginBottom: 20,
    },
} as const;

interface Props {
    children: React.ReactNode;
    screenWidth: number;
    screenHeight: number;
    helmetProps: HelmetProps;
}

export function Layout({
    children,
    screenWidth,
    screenHeight,
    helmetProps,
}: Props) {
    useEffect(() => {
        const { style } = window.document.body;
        style.overflowY = "auto";
        style.overflowX = "hidden";
    }, []);

    const { isFrontend } = useIsFrontend();

    return (
        <>
            <Helmet {...helmetProps} />
            <AppBar position="static" style={styles.appBar}>
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Link href="/">
                        <a>
                            <Typography
                                variant="h4"
                                style={{
                                    flexGrow: 1,
                                    fontWeight: "bold",
                                    color: "white",
                                    fontSize:
                                        screenWidth > 600
                                            ? undefined
                                            : "x-large",
                                }}
                            >
                                Lingual Ninja
                            </Typography>
                        </a>
                    </Link>
                </Toolbar>
            </AppBar>
            {isFrontend && <div css={mainContainerStyle}>{children}</div>}
            <SeasonAnimation
                frequencySec={2}
                screenWidth={screenWidth}
                screenHeight={screenHeight}
            />
            <PopupAd />
            <LoadingAnimation isFrontend={isFrontend} />
        </>
    );
}

const millisecondsToFadeOut = 950;

function LoadingAnimation({ isFrontend }: { isFrontend: boolean }) {
    const [isAnimationShown, setIsAnimationShown] = useState(true);

    useEffect(() => {
        if (isFrontend) {
            setTimeout(() => {
                setIsAnimationShown(false);
            }, millisecondsToFadeOut + 50);
        }
    }, [isFrontend]);

    if (isAnimationShown) {
        return (
            <div css={[loadingStyle, { opacity: isFrontend ? 0 : 1 }]}>
                <ShurikenProgress size="30%" />
            </div>
        );
    }
    return null;
}

const loadingStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2147483647;
    background-color: white;
    transition-property: "opacity";
    transition-duration: ${millisecondsToFadeOut}ms;
`;

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

export const centerStyle = css`
    text-align: center;
    & * {
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
    { marginRight: 15, marginLeft: 15 },
    centerStyle
);

export function getImgNumber(num = 0) {
    const today = new Date();
    const todayNumber = today.getMonth() + today.getDate() + num;
    const mod = todayNumber % 30;
    if (mod > 22) return 2;
    if (mod > 14) return 3;
    return 1;
}
