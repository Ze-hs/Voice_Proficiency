import { useDispatch } from "react-redux";
import { useField } from "../../hooks/hooks";
import { uploadMedia } from "../../reducers/mediaReducer";
const VideoForm = () => {
    const { reset: linkReset, ...link } = useField("text");
    const { reset: nameReset, ...name } = useField("text");
    const dispatch = useDispatch();

    // Call the backend to parse through the video
    // Set redux state media to be this one
    const handleSumbit = (event) => {
        const mediaObj = {
            name: name.value,
            link: link.value,
        };

        event.preventDefault();
        dispatch(uploadMedia(mediaObj));
    };

    const handleReset = () => {
        linkReset();
        nameReset();
    };

    return (
        <form onSubmit={handleSumbit}>
            <label>name</label>
            <input {...name} />

            <label>Link</label>
            <input {...link} />
            <button>Submit</button>
            <button type="button" onClick={handleReset}>
                reset
            </button>
        </form>
    );
};

export default VideoForm;
