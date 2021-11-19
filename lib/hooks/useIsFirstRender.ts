import { useEffect, useState } from "react";

export function useIsFirstRender() {
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsFirstRender(false);
        }, 100);
    }, []);

    return { isFirstRender };
}
