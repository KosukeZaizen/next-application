import { Card } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { CSSProperties, ReactNode, useEffect, useState } from "react";

export function RightPanel({
    open,
    onClose,
    children,
    style,
    screenWidth,
    panelWidth,
    transitionMilliseconds = 1000,
}: {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    style?: CSSProperties;
    screenWidth: number;
    panelWidth: number;
    transitionMilliseconds?: number;
}) {
    const [isContentShown, setIsContentShown] = useState(false);

    useEffect(() => {
        const { style } = window.document.body;
        if (open) {
            setIsContentShown(open);
            style.overflowY = "hidden";
            return;
        }

        style.overflowY = "auto";
        setTimeout(() => {
            setIsContentShown(false);
        }, transitionMilliseconds);
    }, [open, transitionMilliseconds]);

    const transitionDuration = `${transitionMilliseconds}ms`;

    return (
        <>
            {(open || isContentShown) && (
                <div
                    css={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        backgroundColor: "black",
                        opacity: open && isContentShown ? 0.7 : 0,
                        width: "100%",
                        height: "100%",
                        transitionDuration,
                        transitionProperty: "opacity",
                    }}
                    onClick={onClose}
                />
            )}
            <Card
                style={{
                    height: "calc(100% - 30px)",
                    position: "fixed",
                    bottom: 0,
                    right: open ? 0 : -(screenWidth + 20),
                    borderRadius: "20px 0 0 0",
                    padding: "38px 0 5px 5px",
                    transitionDuration,
                    transitionProperty: "right",
                    zIndex: 10001,
                    overflow: "hidden",
                    opacity: isContentShown ? 1 : 0,
                    ...style,
                    width: Math.min(screenWidth, panelWidth),
                }}
            >
                <button
                    className="btn btn-success"
                    css={{
                        borderRadius: "50%",
                        width: 30,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: 5,
                        left: 5,
                    }}
                    onClick={onClose}
                >
                    <CloseIcon style={{ width: 20, height: 20 }} />
                </button>
                <div
                    css={{
                        height: "calc(100% + 5px)",
                        overflowY: "auto",
                        paddingRight: 5,
                    }}
                >
                    {isContentShown && children}
                </div>
            </Card>
        </>
    );
}
