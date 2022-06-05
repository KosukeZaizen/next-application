import { useEffect } from "react";

export function useHashScroll(isFirstRender: boolean) {
    useEffect(() => {
        if (!isFirstRender) {
            document
                .getElementById(location.hash.replace("#", ""))
                ?.scrollIntoView(true);
        }
    }, [isFirstRender]);
}
