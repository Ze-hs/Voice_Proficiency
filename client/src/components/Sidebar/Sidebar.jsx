import { Box } from "@mui/material";
import TranscriptList from "./TranscriptList";
const SideBar = () => {
    return (
        <Box
            sx={{
                display: { xs: "none", lg: "flex" },
                flexDirection: "column",
                height: "100%",
                left: 0,
                maxWidth: "100%",
                position: "fixed",
                scrollbarWidth: "none",
                top: 0,
                width: "var(--SideNav-width)",
                zIndex: "var(--SideNav-zIndex)",
            }}
        >
            <TranscriptList />
        </Box>
    );
};

export default SideBar;
