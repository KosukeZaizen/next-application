import { useEffect, useState } from "react";

const state = { isFrontend: false };
export function useIsFrontend() {
    const [_forRerender, setForRerender] = useState(false);

    useEffect(() => {
        state.isFrontend = true;
        setForRerender(true);
    }, []);

    return { isFrontend: state.isFrontend };
}

export function useIsCompleteFirstRender() {
    const [isCompleteFirstRender, setIsCompleteFirstRender] = useState(false);

    useEffect(() => {
        setIsCompleteFirstRender(true);
    }, []);

    return { isCompleteFirstRender };
}
