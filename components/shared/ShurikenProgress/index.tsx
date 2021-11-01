import * as React from "react";
import { appsPublicImg } from "../../../const/public";
import "./animation.module.css";

const shuriken = appsPublicImg + "shuriken.png";

interface Props {
    size?: string;
    style?: React.CSSProperties;
}
export default function ShurikenProgress({ size, style }: Props) {
    return (
        <div style={style} className="center">
            <img
                src={shuriken}
                alt="shuriken"
                className="ShurikenProgress"
                style={{ width: size, height: size }}
            />
        </div>
    );
}
