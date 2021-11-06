import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: "bold",
    },
    appBar: {
        backgroundColor: "rgb(34,34,34)",
        marginBottom: 20,
    },
}));
interface Props {
    children: React.ReactNode;
}

export function Layout({ children }: Props) {
    const classes = useStyles();

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h4" className={classes.title}>
                        Lingual Ninja
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </>
    );
}

function NavMenu() {
    return <header></header>;
}
