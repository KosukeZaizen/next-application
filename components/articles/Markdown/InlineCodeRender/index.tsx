import React from "react";
import { css } from "../../../../lib/css";

export const InlineCodeRender = (props: any) => {
    return <strong css={red}>{props.value}</strong>;
};

const red = css({ color: "red" });
