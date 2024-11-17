import { useDispatch } from "react-redux";
import { useField } from "../../hooks/hooks";
import { signUp } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
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
import { addNotification } from "../../reducers/notificationReducer";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { reset: nameReset, ...name } = useField("text");
    const { reset: usernameReset, ...username } = useField("email");
    const { reset: passwordReset, ...password } = useField("password");

    const onSignUpClick = () => {
        navigate("/login");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await dispatch(
                signUp({
                    name: name.value,
                    username: username.value,
                    password: password.value,
                })
            );
            nameReset();
            usernameReset();
            passwordReset();
            navigate("/");
        } catch (error) {
            dispatch(
                addNotification({
                    message: "Error! Check Your Credentials",
                    type: "error",
                })
            );
        }
    };

    return (
        <SignUpContainer>
            <MuiCard variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: "100%",
                        fontSize: "clamp(2rem, 10vw, 2.15rem)",
                    }}
                >
                    Sign Up
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
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <TextField
                            id="name"
                            name="name"
                            placeholder="your name"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            {...name}
                        />
                    </FormControl>

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
                        <FormLabel htmlFor="password">Password</FormLabel>

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
                        Sign Up
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        onClick={onSignUpClick}
                    >
                        Log In
                    </Button>
                </Box>
            </MuiCard>
        </SignUpContainer>
    );
};

export default SignUpForm;

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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
