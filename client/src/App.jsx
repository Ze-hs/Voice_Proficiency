import VideoForm from "./components/VideoForm";

import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";

import { Box } from "@mui/material";
import MediaContainer from "./components/MediaContainer";
import SideBar from "./components/Sidebar/Sidebar";

const App = () => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
        }
    }, []);

    return (
        <Box>
            {user ? <MediaContainer /> : <LoginForm />}
            <SideBar />
        </Box>
    );
};

export default App;
