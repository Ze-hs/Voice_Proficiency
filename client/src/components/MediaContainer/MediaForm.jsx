import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useField } from "../../hooks/hooks";
import { useDispatch } from "react-redux";
import { uploadMedia } from "../../reducers/mediaReducer";

const MediaForm = ({ handleCloseDialog, dialogOpen }) => {
    const dispatch = useDispatch();

    const { reset: nameReset, ...name } = useField("text");
    const { reset: linkReset, ...link } = useField("text");

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(uploadMedia({ link: link.value, name: name.value }));
        nameReset();
        linkReset();
        handleCloseDialog();
    };

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            PaperProps={{ component: "form" }}
            onSubmit={handleSubmit}
        >
            <DialogTitle>Add a video to transcribe</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="Name"
                    name="Name"
                    label="Name"
                    fullWidth
                    variant="standard"
                    {...name}
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="Link"
                    name="Link"
                    label="Link"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...link}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MediaForm;
