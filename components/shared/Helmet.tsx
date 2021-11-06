import { useEffect, useState } from "react";
import { Helmet as ReactHelmet } from "react-helmet";
import { getSubDomain } from "../../pages/_app";

export const Helmet = (props: {
    noindex?: boolean;
    title?: string;
    desc?: string;
    isHome?: boolean;
    img?: string;
}) => {
    const subDomain = useSubDomain();

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
                <link
                    rel="icon"
                    type="image/png"
                    href={`${subDomain}Favicon.ico`}
                    sizes="16x16"
                />
            </ReactHelmet>
        </div>
    );
};

function useSubDomain() {
    const [subDomain, setSubDomain] = useState("");
    useEffect(() => {
        const sd = getSubDomain();
        if (sd !== "localhost") {
            setSubDomain(sd);
        }
    }, []);

    return subDomain;
}
