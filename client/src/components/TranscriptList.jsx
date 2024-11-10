import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeTranscripts } from "../reducers/transcriptReducer";
const TranscriptList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeTranscripts());
    }, []);

    const transcripts = useSelector((state) => state.transcripts);

    return (
        <ul>
            {transcripts.map((transcript) => (
                <li key={transcript.id}>{transcript.text}</li>
            ))}
        </ul>
    );
};

export default TranscriptList;
