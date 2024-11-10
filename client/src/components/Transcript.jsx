import { useSelector } from "react-redux";

const Transcript = () => {
    const transcript = useSelector((state) => state.currentTranscript);

    if (!transcript) {
        return <div> CHoose from the list or upload one</div>;
    }

    return (
        <div>
            {transcript.words.map((word) => (
                <div key={`${word.start}${word.text}`}>{word.text}</div>
            ))}
        </div>
    );
};

export default Transcript;
