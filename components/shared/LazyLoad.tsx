import ReactLazyLoad from "react-lazyload";
import React, { ReactNode } from "react";

export function LazyLoad({ children }: { children: ReactNode }) {
    return <ReactLazyLoad offset={500}>{children}</ReactLazyLoad>;
}
