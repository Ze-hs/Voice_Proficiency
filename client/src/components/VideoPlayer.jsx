import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";

const VideoPlayer = forwardRef((_props, refs) => {
    const transcript = useSelector((state) => state.currentTranscript);
    const reactPlayerRef = useRef();

    const [isPLaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0);

    useImperativeHandle(
        refs,
        () => {
            return reactPlayerRef.current;
        },
        [transcript]
    );

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

    if (!transcript) {
        return <p>No video selected</p>;
    }

    return (
        // Lazy load the YouTube player
        <ReactPlayer
            ref={reactPlayerRef}
            url={transcript.audio_url}
            controls={true}
            playing={isPLaying}
        />

        // Controls
    );
});

export default VideoPlayer;
