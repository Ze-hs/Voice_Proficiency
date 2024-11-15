import { useField } from "../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { updateTranscript } from "../reducers/transcriptReducer";
const NoteForm = ({ type }) => {
    const dispatch = useDispatch();

    const notes = useSelector((state) => {
        console.log(state);
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

    const { reset: noteReset, ...noteText } = useField(
        "Text",
        notes ? notes : ""
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateTranscript(type, name, noteText.value));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Text</label>
            <input {...noteText} />
            <button>Save</button>
        </form>
    );
};

export default NoteForm;
