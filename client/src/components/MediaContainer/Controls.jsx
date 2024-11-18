import { Container, Slider, Stack, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useState } from "react";

const Controls = ({
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    volume,
    setVolume,
    reactPlayerRef,
    type,
}) => {
    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const onProgressDrag = (event) => {
        if (isPlaying) {
            handlePlay();
        }

        setProgress(event.target.value);
        reactPlayerRef.current.seekTo(event.target.value, "fraction");
    };
    const onProgressDragStop = (event) => {
        handlePlay();
    };
    const onVolumeDrag = (event) => {
        setVolume(event.target.value);
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            marginRight="2.75em"
            marginTop="1em"
        >
            <Button onClick={handlePlay}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>

            <Container>
                <Slider
                    value={progress}
                    onChange={onProgressDrag}
                    onChangeCommitted={onProgressDragStop}
                    min={0}
                    max={1}
                    step={0.01}
                />
            </Container>

            <Stack direction="row" alignItems="center" spacing={1}>
                <VolumeUpIcon />

                <Slider
                    value={volume}
                    onChange={onVolumeDrag}
                    step={0.01}
                    min={0}
                    max={1}
                    sx={{ width: 100 }}
                    disabled={type === "body"}
                />
            </Stack>
        </Stack>
    );
};

export default Controls;
