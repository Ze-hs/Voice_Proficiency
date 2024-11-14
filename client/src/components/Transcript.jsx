import { useDispatch, useSelector } from "react-redux";
// MaterialUI Imports
import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Transcript = ({ videoPlayerRef }) => {
    const wordRef = useRef(null);

    const [highlightPos, setHighlightPos] = useState(null);
    const transcript = useSelector((state) => state.currentTranscript);

    const getWordProperty = (parent, child) => {
        return {
            width: child.width,
            height: child.height,
            top: child.top - parent.top,
            left: child.left - parent.left,
        };
    };

    const onTimeUpdate = () => {
        const activeWordIndex = transcript.words.findIndex((word) => {
            return videoPlayerRef.current.getCurrentTime() < word.end;
        });

        if (activeWordIndex !== -1) {
            const activeWord = wordRef.current.childNodes[activeWordIndex];
            setHighlightPos(
                getWordProperty(
                    wordRef.current.getBoundingClientRect(),
                    activeWord.getBoundingClientRect()
                )
            );
        }
        return activeWordIndex;
    };

    //When the user clicks on a specific word, jump towards that timestamp
    const onWordClick = (word) => {
        videoPlayerRef.current.seekTo(word.start, "seconds");
    };

    // Check the current timestamp on the video every second
    if (transcript) {
        setInterval(onTimeUpdate, 250);
    }

    if (!transcript) {
        return <Typography> Choose from the list or upload one</Typography>;
    }

    return (
        <Box
            ref={wordRef}
            sx={{
                position: "relative",
                marginTop: "1.25%",
                display: "flex",
                flexWrap: "wrap",
                gap: ".3em",
            }}
        >
            {/* Transcript words */}
            {transcript.words.map((word) => (
                <Typography
                    onClick={() => onWordClick(word)}
                    key={`${word.start}-${word.text}`}
                    sx={{
                        display: "inline",
                        position: "relative",
                        padding: 0,
                        margin: 0,
                        fontSize: "1.05em",
                        zIndex: 2,
                    }}
                >
                    {word.text}
                </Typography>
            ))}
            <Box
                sx={{
                    position: "absolute",
                    background: "red",
                    // background: "primary.main",
                    zIndex: 1,
                    ...highlightPos,
                }}
            ></Box>
        </Box>
    );
};

export default Transcript;
