import React from "react";

export const InlineCodeRender = (props: any) => {
    return <strong css={{ color: "red" }}>{props.value}</strong>;
};
