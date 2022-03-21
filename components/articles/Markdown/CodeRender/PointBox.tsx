import { css, SerializedStyles } from "@emotion/react";
import React from "react";

export function PointBox({
    language,
    children,
    style,
}: {
    language: string;
    children: React.ReactNode;
    style?: SerializedStyles;
}) {
    let content = "'NOTE'";
    let background = "#e3f5d8";
    let border = undefined;
    let titleBackgroundColor = "#22ac38";
    if (language) {
        const [title, color] = language.split("-");
        content = `'${title.split("_").join(" ")}'`;
        if (color) {
            background = "white";
            border = `solid 1px ${color}`;
            titleBackgroundColor = color;
        }
    }

    return (
        <div>
            <div
                css={[
                    css`
                        position: relative;
                        padding: 15px 20px 2px;
                        color: black;
                        border-radius: 2px 10px 10px 10px;
                        background: ${background};
                        margin: 45px 0 30px;
                        display: inline-block;
                        border: ${border};
                        &::before {
                            font-size: 15px;
                            position: absolute;
                            top: -23px;
                            left: 0;
                            height: 23px;
                            padding: 0 1em;
                            content: ${content};
                            color: #fff;
                            border-radius: 10px 10px 0 0;
                            background: ${titleBackgroundColor};
                        }
                    `,
                    style,
                ]}
            >
                {children}
            </div>
        </div>
    );
}
