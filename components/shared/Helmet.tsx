import * as React from "react";
import { Helmet as ReactHelmet } from "react-helmet";

export const Helmet = (props: {
    noindex?: boolean;
    title?: string;
    desc?: string;
    isHome?: boolean;
    img?: string;
}) => {
    return (
        <div className="application">
            <ReactHelmet>
                {props.title ? <title>{props.title}</title> : null}
                {props.desc ? (
                    <meta name="description" content={props.desc} />
                ) : null}
                {props.noindex ? (
                    <meta name="robots" content="noindex" />
                ) : null}
            </ReactHelmet>
        </div>
    );
};
