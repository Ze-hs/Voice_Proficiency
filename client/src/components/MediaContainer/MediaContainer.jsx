import VideoPlayer from "./VideoPlayer";
import Transcript from "./Transcript";
import NoteForm from "./NoteForm";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Container, List, Stack, Typography } from "@mui/material";

import ListIcon from "@mui/icons-material/List";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const MediaContainer = () => {
    const transcript = useSelector((state) => state.currentTranscript);
    const reactPlayerRef = useRef();
    const [type, setType] = useState("default");

    const handleNoteChange = (noteType) => {
        setType(noteType);
    };

    if (!transcript) {
        return (
            <Container>
                <Typography>Choose a video or upload one</Typography>
            </Container>
        );
    }

    return (
        <Container
            sx={{
                display: "flex",
                gap: "1.5em",
                flexDirection: "column",
                height: "50%",
                maxHeight: "50%",
            }}
        >
            <Stack
                direction="row"
                gap={2}
                sx={{
                    marginTop: 3,
                    gap: "1.5em",
                }}
            >
                <VideoPlayer ref={reactPlayerRef} />
                <Transcript videoPlayerRef={reactPlayerRef} />
            </Stack>

            <Stack direction="row" justifyContent="center">
                <NoteForm type={type} />

                <List
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                        justifyContent: "center",
                        paddingInline: ".5em",
                        flex: 1,
                    }}
                >
                    <Button onClick={() => handleNoteChange("default")}>
                        <ListIcon />
                    </Button>
                    <Button onClick={() => handleNoteChange("body")}>
                        <EmojiPeopleIcon />
                    </Button>
                    <Button onClick={() => handleNoteChange("voice")}>
                        <RecordVoiceOverIcon />
                    </Button>
                </List>
            </Stack>
        </Container>
    );
};

export default MediaContainer;
