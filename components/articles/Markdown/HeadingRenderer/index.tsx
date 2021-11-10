import React from "react";

function flatten(
    accText: string,
    child: React.ReactChild | React.ReactFragment | React.ReactPortal
): string {
    if (typeof child === "string" || typeof child === "number") {
        return accText + child;
    }
    if (!("props" in child)) {
        return accText;
    }
    return React.Children.toArray(child.props.children).reduce(
        flatten,
        accText
    );
}

export const HeadingRenderer = (props: HeadingProps) => {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, "");
    const slug = encodeURIComponent(text);
    return React.createElement("h" + props.level, { id: slug }, props.children);
};

interface HeadingProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    > {
    level: "1" | "2" | "3" | "4" | "5" | "6";
}
