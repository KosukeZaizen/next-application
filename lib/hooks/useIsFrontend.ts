import { useEffect, useState } from "react";

export function useIsCompleteFirstRender() {
    const [isCompleteFirstRender, setIsCompleteFirstRender] = useState(false);

    useEffect(() => {
        setIsCompleteFirstRender(true);
    }, []);

    return { isCompleteFirstRender };
}

const state = { isFrontend: false };
export function useIsFrontend() {
    useEffect(() => {
        state.isFrontend = true;
    }, []);

    return { isFrontend: state.isFrontend };
}
