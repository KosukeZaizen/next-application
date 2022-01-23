import { useEffect } from "react";

export function SoundLoader({ load }: { load: () => void }) {
    useEffect(() => {
        load();
    }, [load]);

    return null;
}
