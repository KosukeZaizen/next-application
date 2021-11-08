import { css } from "@emotion/react";
import { CSSPropertiesWithMultiValues, CSSPseudos } from "@emotion/serialize";

export type Css = CSSPropertiesWithMultiValues & CSSPseudos;

export const c = (cssObject: CSSPropertiesWithMultiValues & CSSPseudos) =>
    css(cssObject);
