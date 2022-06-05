import ReactLazyLoad, { LazyLoadProps } from "react-lazyload";
import React, { useEffect } from "react";

export function LazyLoad(props: LazyLoadProps) {
    return <ReactLazyLoad offset={500} {...props} />;
}

export function LazyExecutor({
    fnc,
    ...lazyLoadProps
}: { fnc: () => void } & LazyLoadProps) {
    return (
        <LazyLoad {...lazyLoadProps}>
            <Executor fnc={fnc} />
        </LazyLoad>
    );
}

export function Executor({ fnc }: { fnc: () => void }) {
    useEffect(() => {
        fnc();
    }, [fnc]);

    return null;
}
