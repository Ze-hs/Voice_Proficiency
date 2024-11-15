import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import transcriptService from "../services/transcript";
import signUpService from "../services/signup";

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
        } catch (error) {
            console.log("Wrong credentials");
        }
    };
};

export const signUp = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await signUpService.signup(credentials);
            dispatch(setUser(user));
        } catch (error) {
            console.log("Error Signing up");
        }
    };
};
