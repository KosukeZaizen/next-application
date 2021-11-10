import React from "react";

function flatten(text: string, child: any): string {
    return typeof child === "string"
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
}

export const HeadingRenderer = (props: HeadingProps) => {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, "");
    const slug = encodeURIComponent(text);
    return React.createElement("h" + props.level, { id: slug }, props.children);
};

interface HeadingProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
    level:number;
}