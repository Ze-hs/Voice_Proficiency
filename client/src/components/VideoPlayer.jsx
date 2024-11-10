import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";
const VideoPlayer = () => {
    const data = useSelector((state) => state.media);

    if (!data) {
        return <p>No video selected</p>;
    }

    return (
        // Lazy load the YouTube player
        <ReactPlayer controls={true} />
    );
};

export default VideoPlayer;
