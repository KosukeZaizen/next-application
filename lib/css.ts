import { css as emoCss, SerializedStyles } from "@emotion/react";
import { CSSPropertiesWithMultiValues, CSSPseudos } from "@emotion/serialize";

export type Css = CSSPropertiesWithMultiValues & CSSPseudos;

export const css: (style: Css) => SerializedStyles = emoCss;

export const getClasses = <T extends string>(styles: { [key in T]: Css }) =>
    (Object.keys(styles) as (keyof typeof styles)[]).reduce((acc, val) => {
        return { ...acc, [val]: emoCss(styles[val]) };
    }, {}) as {
        [key in T]: SerializedStyles;
    };
