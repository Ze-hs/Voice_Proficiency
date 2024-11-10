import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { uploadMedia } from "../reducers/mediaReducer";

const DropZone = () => {
    const dispatch = useDispatch();
    // Must change this later to a form with a submit button
    const handleOnDrop = (file) => {
        dispatch(uploadMedia(file[0]));
    };

    return (
        <Dropzone onDrop={handleOnDrop}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
                    </div>
                </section>
            )}
        </Dropzone>
    );
};

export default DropZone;
