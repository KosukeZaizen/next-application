import React, { DetailedHTMLProps, TableHTMLAttributes } from "react";
import { css } from "../../../../lib/css";

export const TableRender = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    columnAlignment,
    ...rest
}: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
> & { columnAlignment: unknown }) => (
    <div css={tableOutsideContainerStyle}>
        <div css={tableInnerContainerStyle}>
            <table {...rest} css={tableStyle} style={{ margin: 0 }} />
        </div>
    </div>
);

const tableOutsideContainerStyle = css({
    width: "100%",
    overflow: "hidden",
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 25,
});

const tableInnerContainerStyle = css({
    width: "100%",
    overflowX: "auto",
    position: "relative",
    transform: "scale(1, -1)",
});

const tableStyle = css({ transform: "scale(1, -1)" });
