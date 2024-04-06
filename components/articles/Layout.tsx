import { css, SerializedStyles } from "@emotion/react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Z_APPS_TOP_URL } from "../../const/public";
import { useIsFirstRender } from "../../lib/hooks/useIsFirstRender";
import { Helmet, HelmetProps } from "../shared/Helmet";
import { Link } from "../shared/Link/LinkWithYouTube";
import { RightPanel } from "../shared/RightPanel";
import { SeasonAnimation } from "../shared/SeasonAnimation";
import ShurikenProgress from "../shared/ShurikenProgress";
import { PopupAd } from "../shared/YouTubeAd/Popup";
import { Author, AuthorArea } from "./Author";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, makeStyles } from "@material-ui/core";
import { ATargetBlank } from "../shared/Link/ATargetBlank";

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
    isSimpleMode?: boolean;
}

let previousScrollY = 0;
let isHidden = false;

const menuItems: { title: string; path: string }[] = [
    { path: "hiragana-katakana", title: "Hiragana / Katakana" },
    { path: "grammar", title: "Grammar" },
    { path: "vocabulary-quiz", title: "Vocab" },
    { path: "folktales", title: "Folktales" },
    { path: "ninja", title: "Games" },
];

export function Layout({
    children,
    screenWidth,
    screenHeight,
    helmetProps,
    noSeasonAnimation,
    author,
    maxWidth,
    isSimpleMode,
}: Props) {
    useEffect(() => {
        const { style } = window.document.body;
        style.overflowY = "auto";
        style.overflowX = "hidden";
    }, []);

    const [hideAppBar, setHideAppBar] = useState(true);
    useEffect(() => {
        setHideAppBar(false);

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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const c = useStyles();

    const { isFirstRender } = useIsFirstRender();

    const isWide = screenWidth > 600;

    return (
        <>
            <Helmet {...helmetProps} />
            {!isSimpleMode && (
                <AppBar
                    position="static"
                    style={{
                        backgroundColor: "rgb(34, 34, 34)",
                        marginBottom: 20,
                        position: "fixed",
                        top: hideAppBar ? -100 : -1,
                        transition: "top 1s",
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
                            <Title isWide={isWide} href={Z_APPS_TOP_URL} />

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: 20,
                                }}
                            >
                                {author && (
                                    <AuthorButton
                                        author={author}
                                        screenWidth={screenWidth}
                                        isWide={isWide}
                                    />
                                )}

                                <div>
                                    <IconButton
                                        style={{ color: "white" }}
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MenuIcon
                                            style={{
                                                minWidth: 35,
                                                minHeight: 35,
                                            }}
                                        />
                                    </IconButton>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        classes={{ paper: c.menuPopover }}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                    >
                                        {menuItems.map(item => (
                                            <MenuItem
                                                key={item.path}
                                                onClick={handleClose}
                                            >
                                                <ATargetBlank
                                                    href={`${Z_APPS_TOP_URL}/${item.path}`}
                                                    style={{ color: "white" }}
                                                >
                                                    {item.title}
                                                </ATargetBlank>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            )}
            {isFirstRender ? (
                isSimpleMode ? (
                    <FullScreenProgress
                        style={css({
                            marginTop: isWide ? 134 : 126,
                            transition: "margin-top 1s",
                        })}
                    />
                ) : (
                    <FullScreenShuriken
                        style={css({
                            marginTop: isWide ? 134 : 126,
                            transition: "margin-top 1s",
                        })}
                    />
                )
            ) : (
                <>
                    <div
                        css={[
                            mainContainerStyle,
                            {
                                marginTop: isSimpleMode ? 30 : isWide ? 70 : 61,
                                transition: "margin-top 1s",
                            },
                        ]}
                    >
                        {children}
                    </div>
                    {!isSimpleMode && (
                        <>
                            {!noSeasonAnimation && (
                                <SeasonAnimation
                                    frequencySec={2}
                                    screenWidth={screenWidth}
                                    screenHeight={screenHeight}
                                />
                            )}
                            <PopupAd />
                        </>
                    )}
                </>
            )}
        </>
    );
}
const useStyles = makeStyles({
    menuPopover: {
        backgroundColor: "rgb(34, 34, 34)",
        color: "white",
    },
});

export function FullScreenShuriken({ style }: { style?: SerializedStyles }) {
    return (
        <div css={[shurikenContainerStyle, style]}>
            <ShurikenProgress size="100%" style={shurikenStyle} />
        </div>
    );
}

export function FullScreenProgress({ style }: { style?: SerializedStyles }) {
    return (
        <div css={[shurikenContainerStyle, style]}>
            <CircularProgress css={shurikenStyle} size={"100%"} />
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
                    whiteSpace: "nowrap",
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
    pCss,
}: {
    author: Author;
    screenWidth: number;
    isWide: boolean;
    pCss?: SerializedStyles;
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
                css={[
                    {
                        cursor: "pointer",
                        fontSize: isWide ? "large" : "medium",
                        "&:hover": {
                            opacity: 0.5,
                        },
                    },
                    pCss,
                ]}
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
