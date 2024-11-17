import { useDispatch, useSelector } from "react-redux";
// MaterialUI Imports
import { Box, Card, Typography } from "@mui/material";
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
        <Card sx={{ flex: 1 }}>
            <Box
                ref={wordRef}
                sx={{
                    position: "relative",
                    margin: "1.5em",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: ".5em",
                    flex: 2,
                }}
            >
                {/* Transcript words */}
                {transcript.words.map((word) => (
                    <Typography
                        onClick={() => onWordClick(word)}
                        key={`${word.start}-${word.text}`}
                        sx={{
                            display: "inline",
                            // position: "relative",
                            lineHeight: "1", // Adjust line height to remove extra spacing
                            margin: 0, // Remove default margin
                            padding: 0, // Remove default padding
                            // fontSize: "1.05em",
                            zIndex: 2,
                        }}
                    >
                        {word.text}
                    </Typography>
                ))}
                <Box
                    sx={{
                        position: "absolute",
                        opacity: "35%",
                        backgroundColor: "primary.main",
                        zIndex: 1,
                        ...highlightPos,
                    }}
                ></Box>
            </Box>
        </Card>
    );
};

export default Transcript;
