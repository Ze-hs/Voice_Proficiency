import { useRef, forwardRef, useImperativeHandle } from "react";
import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";

const VideoPlayer = forwardRef((_props, refs) => {
    const data = useSelector((state) => state.currentTranscript);
    const reactPlayerRef = useRef();

    useImperativeHandle(
        refs,
        () => {
            return reactPlayerRef.current;
        },
        [data]
    );

    if (!data) {
        return <p>No video selected</p>;
    }

    return (
        // Lazy load the YouTube player
        <ReactPlayer
            ref={reactPlayerRef}
            url={data.audio_url}
            controls={true}
        />
    );
});

export default VideoPlayer;
