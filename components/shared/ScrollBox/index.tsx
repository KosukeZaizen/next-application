import { SerializedStyles } from "@emotion/utils";
import styles from "./style.module.css";

interface Props {
    style?: SerializedStyles;
    children: React.ReactNode;
}
export const ScrollBox = (props: Props) => {
    const { children, style } = props;
    return (
        <div css={style} className={styles["style-scroll"]}>
            {children}
        </div>
    );
};
