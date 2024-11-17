import { useField } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { updateTranscript } from "../../reducers/transcriptReducer";
import { FormControl } from "@mui/material";

import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";

const NoteForm = ({ type }) => {
    const dispatch = useDispatch();

    const notes = useSelector((state) => {
        switch (type) {
            case "body":
                return state.currentTranscript.body_notes;
            case "voice":
                return state.currentTranscript.voice_notes;
            default:
                return state.currentTranscript.notes;
        }
    });

    const name = useSelector((state) => state.currentTranscript.name);
    const [noteText, setNoteText] = useState(notes);
    const { reset: nameReset, ...nameText } = useField("Text", name);

    const labels = {
        body: "Body Language",
        voice: "Voice Notes",
        default: "General Notes",
    };

    useEffect(() => {
        setNoteText(notes);
    }, [notes, type]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateTranscript(type, nameText.value, noteText));
    };

    const handleTextChange = (event) => {
        setNoteText(event.target.value);
    };

    return (
        <FormControl
            component="form"
            sx={{ display: "flex", gap: "1em", flex: "20" }}
            onSubmit={handleSubmit}
        >
            <TextField fullWidth label="Name" {...nameText}></TextField>

            <TextField
                multiline
                fullWidth
                label={labels[type] ? labels[type] : labels["default"]}
                minRows={11}
                maxRows={11}
                value={noteText}
                onChange={handleTextChange}
            ></TextField>
            <Button variant="contained" type="submit">
                Save
            </Button>
        </FormControl>
    );
};

export default NoteForm;
