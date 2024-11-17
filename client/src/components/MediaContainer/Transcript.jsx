import { useSelector } from "react-redux";
// MaterialUI Imports
import { Box, Card, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Transcript = ({ videoPlayerRef }) => {
    const wordRef = useRef(null);

    const [highlightPos, setHighlightPos] = useState(null);
    const transcript = useSelector((state) => state.currentTranscript);
    const [activeWordIndex, setActiveWordIndex] = useState(null);

    const getWordProperty = (parent, child) => {
        return {
            width: child.width,
            height: child.height,
            top: child.top - parent.top,
            left: child.left - parent.left,
        };
    };

    // Use setInterval inside a useEffect
    useEffect(() => {
        const interval = setInterval(onTimeUpdate, 250);
        return () => clearInterval(interval);
    }, [transcript, activeWordIndex]);

    const onTimeUpdate = () => {
        if (!transcript || !wordRef.current) return;

        const newActiveWordIndex = transcript.words.findIndex((word) => {
            return videoPlayerRef.current.getCurrentTime() < word.end;
        });

        if (
            newActiveWordIndex !== -1 &&
            newActiveWordIndex !== activeWordIndex
        ) {
            setActiveWordIndex(newActiveWordIndex);

            const activeWord = wordRef.current.childNodes[newActiveWordIndex];
            if (activeWord) {
                setHighlightPos(
                    getWordProperty(
                        wordRef.current.getBoundingClientRect(),
                        activeWord.getBoundingClientRect()
                    )
                );
            }

            activeWord.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    //When the user clicks on a specific word, jump towards that timestamp
    const onWordClick = (word) => {
        videoPlayerRef.current.seekTo(word.start, "seconds");
    };

    if (!transcript) {
        return <Typography> Choose from the list or upload one</Typography>;
    }

    return (
        <Card sx={{ flex: 1, height: "inherit" }}>
            <Box
                ref={wordRef}
                sx={{
                    position: "relative",
                    margin: "1.5em",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: ".5em",
                    height: "100%",
                    overflow: "auto",
                    alignContent: "flex-start",
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
                        {`${word.text} `}
                    </Typography>
                ))}
                <Box
                    sx={{
                        position: "absolute",
                        opacity: "35%",
                        backgroundColor: "primary.main",
                        zIndex: 1,
                        transition: "all 0.2s ease",

                        ...highlightPos,
                    }}
                ></Box>
            </Box>
        </Card>
    );
};

export default Transcript;
