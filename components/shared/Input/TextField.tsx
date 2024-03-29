import { InputBaseComponentProps } from "@material-ui/core/InputBase";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import React, { CSSProperties, useState } from "react";

export function TextField({
    onMouseDown,
    onFocus,
    inputProps,
    ...rest
}: TextFieldProps) {
    const [inputStyle, setInputStyle] = useState<CSSProperties | undefined>(
        getInitialInputStyle(inputProps, rest.autoFocus)
    );

    return (
        <MuiTextField
            {...rest}
            onMouseDown={ev => {
                /**
                 * Prevent iPhone screen from zooming automatically
                 *    Reference: https://stackoverflow.com/a/41487632
                 */
                (
                    ev.target as HTMLInputElement | HTMLTextAreaElement
                ).style.fontSize = "16px"; // Modify the real DOM directly before iPhone detects the font-size

                setInputStyle({ ...inputProps?.style, fontSize: 16 }); // Virtual DOM will also be changed

                onMouseDown?.(ev);
            }}
            onFocus={ev => {
                setInputStyle({ ...inputProps?.style });

                onFocus?.(ev);
            }}
            inputProps={{
                ...inputProps,
                style: { ...inputProps?.style, ...inputStyle },
            }}
        />
    );
}

export function focusInputSafely(inputEl: HTMLInputElement) {
    const currentFontSize = inputEl.style.fontSize;
    inputEl.style.fontSize = "16px"; // Modify the real DOM directly before iPhone detects the font-size
    inputEl.focus();
    inputEl.style.fontSize = currentFontSize;
}

function getInitialInputStyle(
    inputProps: InputBaseComponentProps | undefined,
    autoFocus?: boolean
): CSSProperties | undefined {
    if (autoFocus) {
        return { ...inputProps?.style, fontSize: 16 };
    }
    return inputProps?.style;
}
