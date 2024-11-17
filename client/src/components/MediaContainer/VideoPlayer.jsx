import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";
import Controls from "./Controls";
import { Card } from "@mui/material";
const VideoPlayer = forwardRef((_props, refs) => {
    const transcript = useSelector((state) => state.currentTranscript);
    const reactPlayerRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);

    const controlProps = {
        isPlaying,
        setIsPlaying,
        progress,
        setProgress,
        volume,
        setVolume,
        reactPlayerRef,
    };

    const updateProgress = ({ played }) => {
        setProgress(played);
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
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                flex: 2,
                padding: 2,
            }}
        >
            <ReactPlayer
                ref={reactPlayerRef}
                url={transcript.audio_url}
                playing={isPlaying}
                onProgress={updateProgress}
                volume={volume}
                progressInterval={250}
            />
            <Controls {...controlProps} />
        </Card>
    );
});

export default VideoPlayer;
