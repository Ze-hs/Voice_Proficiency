import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";
import Controls from "./Controls";
import { Card, Container } from "@mui/material";

const VideoPlayer = forwardRef(({ type }, refs) => {
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
        type,
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
                position: "relative",
            }}
        >
            <ReactPlayer
                ref={reactPlayerRef}
                url={transcript.audio_url}
                playing={isPlaying}
                onProgress={updateProgress}
                volume={type === "body" ? 0 : volume}
                progressInterval={250}
                onEnded={() => setIsPlaying(false)}
            />
            {type === "voice" && (
                <Container
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                    }}
                />
            )}
            <Controls {...controlProps} />
        </Card>
    );
});

export default VideoPlayer;
