import { Container, Slider, Stack, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CircleIcon from "@mui/icons-material/Circle";
const Controls = ({
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    volume,
    setVolume,
    reactPlayerRef,
}) => {
    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const onProgressDrag = (event) => {
        handlePause();
        reactPlayerRef.current.seekTo(progress, "fraction");
    };
    const onProgressDragStop = (event) => {
        handlePlay();
    };
    const onVolumeDrag = (event) => {
        setVolume(event.target.value);
    };

    return (
        <Stack direction="row">
            <Button onClick={handlePlay}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>

            <Container></Container>
        </Stack>
    );
};

export default Controls;
