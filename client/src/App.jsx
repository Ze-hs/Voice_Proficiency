import VideoPlayer from "./components/VideoPlayer";
import VideoForm from "./components/VideoForm";
import TranscriptList from "./components/TranscriptList";
const App = () => {
    return (
        <>
            <TranscriptList />
            <VideoForm />
            <VideoPlayer />
        </>
    );
};

export default App;
