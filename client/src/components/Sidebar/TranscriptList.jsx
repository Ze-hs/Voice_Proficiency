import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeTranscripts } from "../../reducers/transcriptListReducer";
import { getTranscript } from "../../reducers/transcriptReducer";
import {
    List,
    Box,
    Typography,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Button,
} from "@mui/material";

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
        <List
            subheader={
                <ListSubheader
                    sx={{
                        fontSize: "1em",
                        color: "black",
                        borderBottom: "1px solid #e0e0e0",
                    }}
                >
                    Transcripts
                </ListSubheader>
            }
        >
            {transcripts.map((transcript) => (
                <ListItemButton
                    onClick={() => handleClick(transcript)}
                    key={transcript.id}
                >
                    <ListItemText
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {transcript.name}
                    </ListItemText>
                </ListItemButton>
            ))}
        </List>
    );
};

export default TranscriptList;
