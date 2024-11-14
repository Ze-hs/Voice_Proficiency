import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import Controls from "./Controls";
import { Container } from "@mui/material";

const VideoPlayer = forwardRef((_props, refs) => {
    const transcript = useSelector((state) => state.currentTranscript);
    const reactPlayerRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0);

    const controlProps = {
        isPlaying,
        setIsPlaying,
        progress,
        setProgress,
        volume,
        setVolume,
        reactPlayerRef,
    };

    useImperativeHandle(
        refs,
        () => {
            return reactPlayerRef.current;
        },
        [transcript]
    );

    if (!transcript) {
        return <p>No video selected</p>;
    }

    return (
        // Lazy load the YouTube player
        <Container>
            // Lazy load the YouTube player
            <ReactPlayer
                ref={reactPlayerRef}
                url={transcript.audio_url}
                controls={true}
                playing={isPlaying}
            />
            // Controls
            <Controls {...controlProps} />
        </Container>
    );
});

export default VideoPlayer;
