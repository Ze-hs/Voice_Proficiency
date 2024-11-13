import VideoPlayer from "./components/VideoPlayer";
import VideoForm from "./components/VideoForm";
import TranscriptList from "./components/TranscriptList";
import Transcript from "./components/Transcript";

import { useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";
const App = () => {
    const reactPlayerRef = useRef();
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
        <>
            {!user && <LoginForm />}

            <TranscriptList />
            <VideoForm />
            <VideoPlayer ref={reactPlayerRef} />
            <Transcript videoPlayerRef={reactPlayerRef} />
        </>
    );
};

export default App;
