import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { ChangeEventHandler, useState } from "react";
import { TextField } from "./TextField";

export function PasswordField({
    onChange,
    password,
    label = "Password",
}: {
    onChange: ChangeEventHandler<HTMLInputElement>;
    password: string;
    label?: string;
}) {
    const [visible, setVisible] = useState(false);
    const classes = useStyles();

    return (
        <div className={classes.passwordContainer}>
            <TextField
                variant="outlined"
                margin="none"
                required
                fullWidth
                placeholder={label}
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                onChange={onChange}
                value={password}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                    setVisible(!visible);
                                }}
                            >
                                {visible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

export const useStyles = makeStyles({
    passwordContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 8,
    },
});
