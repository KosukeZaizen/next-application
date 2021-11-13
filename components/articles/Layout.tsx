import { css } from "@emotion/react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { A } from "../shared/Link/A";
import { SeasonAnimation } from "../shared/SeasonAnimation";
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
}

export function Layout({ children, screenWidth, screenHeight }: Props) {
    useEffect(() => {
        const { style } = window.document.body;
        style.overflowY = "auto";
        style.overflowX = "hidden";
    }, []);

    return (
        <>
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
                    <A href="/">
                        <Typography
                            variant="h4"
                            style={{
                                flexGrow: 1,
                                fontWeight: "bold",
                                color: "white",
                                fontSize:
                                    screenWidth > 600 ? undefined : "x-large",
                            }}
                        >
                            Lingual Ninja
                        </Typography>
                    </A>
                </Toolbar>
            </AppBar>
            <div css={mainContainerStyle}>{children}</div>
            <SeasonAnimation
                frequencySec={2}
                screenWidth={screenWidth}
                screenHeight={screenHeight}
            />
            <PopupAd />
        </>
    );
}

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
