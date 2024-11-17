import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { removeNotification } from "../../reducers/notificationReducer";

const Notification = () => {
    const notifications = useSelector((state) => state.notification);
    const [curNotification, setCurNotification] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!curNotification && notifications.length > 0) {
            setCurNotification(notifications[0]);
        }
    }, [notifications, curNotification]);

    const handleClose = (event, reason) => {
        dispatch(removeNotification());
        setCurNotification(null);
    };

    return (
        <Snackbar
            open={curNotification !== null}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            {curNotification && (
                <Alert
                    variant="filled"
                    sx={{ width: "100%" }}
                    severity={curNotification.type}
                    onClose={handleClose}
                >
                    {curNotification.message}
                </Alert>
            )}
        </Snackbar>
    );
};

export default Notification;
