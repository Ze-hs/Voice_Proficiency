import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeTranscripts } from "../reducers/transcriptListReducer";
import { getTranscript } from "../reducers/transcriptReducer";

const TranscriptList = () => {
    const dispatch = useDispatch();
    const transcripts = useSelector((state) => state.transcripts);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            console.log("User here", user);
            dispatch(initializeTranscripts(user.id));
        }
    }, [user]);

    const handleClick = (id) => {
        dispatch(getTranscript(id));
    };

    return (
        <div>
            {transcripts.map((transcript) => (
                <div
                    onClick={() => handleClick(transcript.id)}
                    key={transcript.id}
                >
                    - {transcript.name}
                </div>
            ))}
        </div>
    );
};

export default TranscriptList;
