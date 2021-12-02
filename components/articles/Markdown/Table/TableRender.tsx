import React, { DetailedHTMLProps, TableHTMLAttributes } from "react";

export const TableRender = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    columnAlignment,
    ...rest
}: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
> & { columnAlignment: unknown }) => (
    <div
        className="tableContainer"
        style={{
            width: "100%",
            overflowX: "auto",
            position: "relative",
            marginTop: 25,
            marginBottom: 25,
        }}
    >
        <table {...rest} style={{ margin: 0 }} />
    </div>
);
