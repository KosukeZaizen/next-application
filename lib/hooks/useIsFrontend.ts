import { useEffect, useState } from "react";

export function useIsFrontend() {
    const [isFrontend, setIsFrontend] = useState(false);

    useEffect(() => {
        setIsFrontend(true);
    }, []);

    return { isFrontend };
}
