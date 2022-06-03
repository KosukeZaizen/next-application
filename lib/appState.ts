import { useEffect, useState } from "react";

type AppState = {
    isNoYouTubeAdMode: boolean;
};
const appState: AppState = {
    isNoYouTubeAdMode: false,
};

export function getAppState() {
    return { ...appState };
}

type ArrFnc = ((value: AppState[keyof AppState]) => void)[];

const setValues: {
    [key in keyof AppState]?: ArrFnc;
} = {};

export function changeAppState<T extends keyof AppState>(
    name: T,
    value: AppState[T]
) {
    appState[name] = value;
    setValues[name]?.forEach(f => f(value));
}

export function useAppState<T extends keyof AppState>(
    stateName: T
): [AppState[T], (value: AppState[T]) => void] {
    const [value, setValue] = useState<AppState[T]>(appState[stateName]);

    useEffect(() => {
        const arrFnc: ArrFnc = setValues[stateName] || [];

        setValues[stateName] = [...arrFnc, setValue] as ArrFnc;

        return () => {
            setValues[stateName] = setValues[stateName]?.filter(
                f => f !== setValue
            );
        };
    }, [stateName]);

    return [
        value,
        newValue => {
            changeAppState(stateName, newValue);
        },
    ];
}
