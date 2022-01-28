import ReactLazyLoad from "react-lazyload";
import React, { ReactNode, useEffect } from "react";

export function LazyLoad({ children }: { children: ReactNode }) {
    return <ReactLazyLoad offset={500}>{children}</ReactLazyLoad>;
}

export function LazyExecutor({ fnc }: { fnc: () => void }) {
    return (
        <LazyLoad>
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
