import VideoPlayer from "./components/VideoPlayer";
import VideoForm from "./components/VideoForm";
import TranscriptList from "./components/TranscriptList";
import Transcript from "./components/Transcript";
const App = () => {
    return (
        <>
            <TranscriptList />
            <VideoForm />
            <VideoPlayer />
            <Transcript />
        </>
    );
};

export default App;
