import VideoPlayer from "./VideoPlayer";
import Transcript from "./Transcript";
import NoteForm from "./NoteForm";
import { Container } from "@mui/material";
import { useRef } from "react";
import { useSelector } from "react-redux";

const MediaContainer = () => {
    const transcript = useSelector((state) => state.currentTranscript);
    const reactPlayerRef = useRef();

    if (!transcript) {
        return <p> Choose a video or upload one</p>;
    }

    return (
        <Container>
            <VideoPlayer ref={reactPlayerRef} />
            <Transcript videoPlayerRef={reactPlayerRef} />
            <NoteForm />
        </Container>
    );
};

export default MediaContainer;
