import React, { useEffect } from "react";
import { YouTubeAd } from ".";
import { getClasses } from "../../../lib/css";

export const PopupAd = () => {
    const [isShown, setIsShown] = React.useState(false);
    const [isTimerStarted, setIsTimerStarted] = React.useState(false);

    useEffect(() => {
        setTimeout(() => {
            const showAd = () => {
                const savedDate = localStorage.getItem("YouTubeAdClosed");
                if (savedDate) {
                    const date = new Date(savedDate);
                    const dif = new Date().getTime() - date.getTime();
                    if (dif < 1000 * 60 * 60 * 24 * 14) {
                        // Don't show for two weeks
                        return;
                    }
                }
                setIsTimerStarted(true);
                setTimeout(() => setIsShown(true), 10);
            };
            const body = document.querySelector("body");
            if (!body) {
                return;
            }
            body.onscroll = showAd;
        }, 30 * 1000);
    }, []);

    if (!isTimerStarted) {
        return null;
    }

    const maxWidth = 500;
    const shorterLine = Math.min(window.innerWidth, window.innerHeight);
    const adWidth = shorterLine < maxWidth ? shorterLine : maxWidth;

    const close = () => {
        localStorage.setItem("YouTubeAdClosed", new Date().toISOString());
        setIsTimerStarted(false);
    };

    return (
        <div
            css={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                opacity: isShown ? 1 : 0,
                transition: "2s",
            }}
        >
            <div css={c.grayDiv} />

            <div css={c.container}>
                <div
                    css={{
                        width: adWidth - 20,
                        height: adWidth,
                        backgroundColor: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: 10,
                        zIndex: 2147483647,
                    }}
                    onClick={ev => ev.stopPropagation()}
                >
                    <YouTubeAd width={adWidth - 60} />
                    <div onClick={close} css={c.close}>
                        Close
                    </div>
                </div>
            </div>
        </div>
    );
};

const c = getClasses({
    container: {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    grayDiv: {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "gray",
        opacity: 0.5,
    },
    close: { cursor: "pointer", color: "black" },
});
