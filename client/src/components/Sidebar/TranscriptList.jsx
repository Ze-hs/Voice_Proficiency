import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeTranscripts } from "../../reducers/transcriptListReducer";
import { getTranscript } from "../../reducers/transcriptReducer";
import { Stack, Box } from "@mui/material";

const TranscriptList = () => {
    const dispatch = useDispatch();
    const transcripts = useSelector((state) => state.transcripts);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            dispatch(initializeTranscripts(user.id));
        }
    }, [user]);

    const handleClick = (transcriptInfo) => {
        dispatch(getTranscript(transcriptInfo));
    };

    return (
        <Stack>
            {transcripts.map((transcript) => (
                <Box
                    onClick={() => handleClick(transcript)}
                    key={transcript.id}
                    sx={{
                        alignItems: "center",
                        borderRadius: 1,
                        color: "var(--NavItem-color)",
                        cursor: "pointer",
                        display: "flex",
                        flex: "0 0 auto",
                        gap: 1,
                        p: "6px 16px",
                        position: "relative",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                    }}
                >
                    {transcript.name}
                </Box>
            ))}
        </Stack>
    );
};

export default TranscriptList;
