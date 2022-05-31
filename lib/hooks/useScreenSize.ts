import { useEffect, useState } from "react";
import { useUnmounted } from "./useUnmounted";

export function useScreenSize() {
    const [screenSize, setScreenSize] = useState({
        screenWidth: 500,
        screenHeight: 500,
    });
    const { getIsUnmounted } = useUnmounted();

    useEffect(() => {
        const changeScreenSize = () => {
            if (!getIsUnmounted()) {
                setScreenSize(getScreenSize());
            }
        };

        let timer = 0;
        const onResize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }
            timer = window.setTimeout(changeScreenSize, 100);
        };
        window.addEventListener("resize", onResize);
        onResize();

        return () => window.removeEventListener("resize", onResize);
    }, [getIsUnmounted]);

    return screenSize;
}

function getScreenSize() {
    const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
    return {
        screenWidth,
        screenHeight,
    };
}
