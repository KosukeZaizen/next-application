import { useEffect, useMemo, useState } from "react";

export function useScreenSize() {
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);
    const { getUnmounted } = useUnmounted();

    useEffect(() => {
        let timer: number;
        window.onresize = () => {
            if (getUnmounted()) {
                return;
            }

            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = window.setTimeout(() => {
                setScreenWidth(window.innerWidth);
                setScreenHeight(window.innerHeight);
            }, 100);
        };

        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    }, []);

    return { screenWidth, screenHeight };
}

let mountedIds: number[] = [];

export function useUnmounted() {
    const id = useMemo(
        () => (mountedIds.length ? Math.max(...mountedIds) + 1 : 1),
        []
    );

    useEffect(() => {
        mountedIds.push(id);

        return () => {
            mountedIds = mountedIds.filter(mid => mid !== id);
        };
    }, [id]);

    // Empty array will also return true.
    return { getUnmounted: () => mountedIds.every(mid => mid !== id) };
}
