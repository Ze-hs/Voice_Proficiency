import { Contrainer } from "@mui/material";

const Controls = () => {
    const handlePlay = () => {
        setIsPlaying(true);
    };
    const handlePause = () => {
        setIsPlaying(false);
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

    return null;
};

export default Controls;
