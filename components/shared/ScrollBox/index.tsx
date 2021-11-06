import styles from "./style.module.css";

interface Props {
    style?: React.CSSProperties;
    children: React.ReactNode;
}
export const ScrollBox = (props: Props) => {
    const { children, style } = props;
    return (
        <div style={style} className={styles["style-scroll"]}>
            {children}
        </div>
    );
};
