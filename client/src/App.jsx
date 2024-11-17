import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { setUser } from "./reducers/userReducer";

import SideBar from "./components/Sidebar/Sidebar";
import MediaContainer from "./components/MediaContainer/MediaContainer";
import LoginForm from "./components/Authorization/LoginForm";

import { Container } from "@mui/material";
import SignUpForm from "./components/Authorization/SignUpForm";
import Notification from "./components/Notifications/Notification";

const App = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {}, 5000);
        const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
        }
    }, []);

    return (
        <Container>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route
                    path="/"
                    element={
                        user ? (
                            <Container>
                                <MediaContainer />
                                <SideBar />
                            </Container>
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
            </Routes>

            <Notification />
        </Container>
    );
};

export default App;
