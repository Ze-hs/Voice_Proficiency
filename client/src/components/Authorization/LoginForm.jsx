import { useDispatch, useSelector } from "react-redux";
import { useField } from "../../hooks/hooks";
import { login } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// MUI imports
import {
    Card,
    Typography,
    Box,
    FormControl,
    TextField,
    FormLabel,
    Button,
    styled,
    Stack,
} from "@mui/material";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const { reset: usernameReset, ...username } = useField("text");
    const { reset: passwordReset, ...password } = useField("password");

    useEffect(() => {
        if (user) {
            // Navigate only after the user is logged in
            navigate("/");
        }
    }, [user]);

    const onSignInClick = () => {
        navigate("/signup");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ username: username.value, password: password.value }));
    };

    return (
        <SignInContainer>
            <MuiCard variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: "100%",
                        fontSize: "clamp(2rem, 10vw, 2.15rem)",
                    }}
                >
                    Log in
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            {...username}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            {...password}
                        />
                    </FormControl>

                    <Button type="submit" fullWidth variant="contained">
                        Sign in
                    </Button>

                    <Button
                        type="button"
                        variant="outlined"
                        fullWidth
                        onClick={onSignInClick}
                    >
                        Sign Up
                    </Button>
                </Box>
            </MuiCard>
        </SignInContainer>
    );
};

export default LoginForm;

// Container elements modified using MUI
const MuiCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));
