import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { SeasonAnimation } from "../shared/SeasonAnimation";

const styles = {
    appBar: {
        backgroundColor: "rgb(34, 34, 34)",
        marginBottom: 20,
    },
    title: {
        flexGrow: 1,
        fontWeight: "bold",
    },
} as const;

interface Props {
    children: React.ReactNode;
    screenWidth: number;
    screenHeight: number;
}

export function Layout({ children, screenWidth, screenHeight }: Props) {
    return (
        <>
            <AppBar position="static" style={styles.appBar}>
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h4" style={styles.title}>
                        Lingual Ninja
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
            <SeasonAnimation
                frequencySec={2}
                screenWidth={screenWidth}
                screenHeight={screenHeight}
            />
        </>
    );
}
