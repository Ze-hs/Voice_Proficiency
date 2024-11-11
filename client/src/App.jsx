import VideoPlayer from "./components/VideoPlayer";
import VideoForm from "./components/VideoForm";
import TranscriptList from "./components/TranscriptList";
import Transcript from "./components/Transcript";

import { useRef } from "react";

const App = () => {
    const reactPlayerRef = useRef();

    return (
        <>
            <TranscriptList />
            <VideoForm />
            <VideoPlayer ref={reactPlayerRef} />
            <Transcript videoPlayerRef={reactPlayerRef} />
        </>
    );
};

export default App;
