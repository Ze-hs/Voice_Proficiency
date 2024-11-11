import { useSelector } from "react-redux";
import { convertToSec } from "../utils/helper";
const Transcript = ({ videoPlayerRef }) => {
    const transcript = useSelector((state) => state.currentTranscript);
    //When the user clicks on a specific word, jump towards that timestamp
    const handleClick = (word) => {
        const timeStamp = convertToSec(word.start, 200);
        videoPlayerRef.current.seekTo(timeStamp, "seconds");
    };

    if (!transcript) {
        return <div> CHoose from the list or upload one</div>;
    }

    return (
        <div>
            {transcript.words.map((word) => (
                <div
                    onClick={() => handleClick(word)}
                    key={`${word.start}${word.text}`}
                >
                    {word.text}
                </div>
            ))}
        </div>
    );
};

export default Transcript;
