import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { removeUser } from "../../reducers/userReducer";
import TranscriptList from "./TranscriptList";
import { Drawer, List, ListItemButton, ListItemText, Box } from "@mui/material";
import { useState } from "react";
import MediaForm from "../MediaContainer/MediaForm";
const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(removeUser());
        navigate("/login");
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <MediaForm
                dialogOpen={dialogOpen}
                handleCloseDialog={handleCloseDialog}
            />
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 240,
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
                anchor="left"
            >
                <Box
                    sx={{
                        flexGrow: 1, // Allows this section to take available space
                        overflowY: "auto", // Enables scrolling for overflow
                    }}
                >
                    <TranscriptList />
                </Box>
                <List
                    sx={{
                        borderTop: "1px solid #e0e0e0", // Optional separator
                    }}
                >
                    <ListItemButton onClick={handleOpenDialog}>
                        <ListItemText>Upload New</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText onClick={handleLogOut}>
                            Log out
                        </ListItemText>
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
};

export default SideBar;
