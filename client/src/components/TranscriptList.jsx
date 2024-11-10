import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeTranscripts } from "../reducers/transcriptListReducer";
import { setCurrentTranscript } from "../reducers/transcriptReducer";

const TranscriptList = () => {
    const dispatch = useDispatch();
    const transcripts = useSelector((state) => state.transcripts);

    useEffect(() => {
        dispatch(initializeTranscripts());
    }, []);

    const handleClick = (transcriptObj) => {
        dispatch(setCurrentTranscript(transcriptObj));
    };

    return (
        <div>
            {transcripts.map((transcript) => (
                <div
                    onClick={() => handleClick(transcript)}
                    key={transcript.id}
                >
                    {transcript.text}
                </div>
            ))}
        </div>
    );
};

export default TranscriptList;
