import { css, SerializedStyles } from "@emotion/react";
import { CSSPropertiesWithMultiValues, CSSPseudos } from "@emotion/serialize";

export type Css = CSSPropertiesWithMultiValues & CSSPseudos;

export const getClasses = <T extends string>(styles: { [key in T]: Css }) =>
    (Object.keys(styles) as (keyof typeof styles)[]).reduce((acc, val) => {
        return { ...acc, [val]: css(styles[val]) };
    }, {}) as {
        [key in T]: SerializedStyles;
    };
