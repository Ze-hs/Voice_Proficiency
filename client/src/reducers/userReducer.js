import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import transcriptService from "../services/transcript";
import signUpService from "../services/signup";
import { addNotification } from "./notificationReducer";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            window.localStorage.setItem(
                "loggedAppUser",
                JSON.stringify(action.payload)
            );
            transcriptService.setToken(action.payload.token);
            return action.payload;
        },
        removeUser(state, action) {
            window.localStorage.removeItem("loggedAppUser");
            transcriptService.setToken(null);

            return null;
        },
    },
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(credentials);
            dispatch(setUser(user));
            dispatch(
                addNotification({ message: "Logged in", type: "success" })
            );
        } catch (error) {
            dispatch(
                addNotification({ message: "Wrong Credentials", type: "error" })
            );
        }
    };
};

export const signUp = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await signUpService.signup(credentials);
            dispatch(setUser(user));
            addNotification({
                message: "Sign Up successful! Please Log In Now",
                type: "success",
            });
        } catch (error) {
            addNotification({
                message: "An Error Has Occured! Try Again Later",
                type: "error",
            });
        }
    };
};
