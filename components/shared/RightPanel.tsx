import { Card } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { CSSProperties, ReactNode, useEffect, useState } from "react";

export function RightPanel({
    open,
    onClose,
    children,
    style,
    width = 800,
    transitionMilliseconds = 1000,
}: {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    style?: CSSProperties;
    width?: number;
    transitionMilliseconds?: number;
}) {
    const [isContentShown, setIsContentShown] = useState(false);

    useEffect(() => {
        if (open) {
            setIsContentShown(open);
            return;
        }
        setTimeout(() => {
            setIsContentShown(false);
        }, transitionMilliseconds);
    }, [open, transitionMilliseconds]);

    return (
        <Card
            style={{
                height: "calc(100% - 30px)",
                position: "fixed",
                bottom: 0,
                right: open ? 0 : -(width + 20),
                borderRadius: "20px 0 0 0",
                padding: "40px 5px 5px 5px",
                transition: `${transitionMilliseconds}ms`,
                transitionProperty: "right",
                zIndex: 10000,
                overflow: "hidden",
                ...style,
                width,
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
                // style={{ backgroundColor: "#212529" }}
                onClick={onClose}
            >
                <CloseIcon style={{ width: 20, height: 20 }} />
            </button>
            <div css={{ height: "100%", overflowY: "auto" }}>
                {isContentShown && children}
            </div>
        </Card>
    );
}
