# Voice Proficiency

**Voice Proficiency** is a web application designed to help users improve their communication skills through guided exercises. It allows users to upload video files, automatically transcribe them, and take notes in three distinct modes:

1. **General Notes**: Watch and listen to the video while jotting down observations.
2. **Voice Notes**: Focus on vocal delivery by listening to the audio with the video hidden.
3. **Body Movement Notes**: Analyze physical gestures and posture by muting the audio.

Each mode includes a dedicated notes section tailored to specific aspects of speech improvement.

Inspired by Vinh Giang's masterclass on communication, this application supports practicing core skills such as voice mastery, body language, and storytelling—essential for public speaking, presentations, and effective communication.

## Features

- **Video Uploads**: Upload videos for transcription and analysis.
- **Automatic Transcription**: Powered by AssemblyAI for accurate and efficient transcription.
- **Multiple Modes**: Focus separately on audio, visuals, or both.
- **Dedicated Notes**: Capture detailed insights for each exercise mode.

## Getting Started

Follow these steps to run the project locally:

### Clone the Repository

```bash
$ git clone https://github.com/Ze-hs/Voice_Proficiency.git
```

### Install Dependencies

```bash
$ cd Voice_Proficiency/backend
$ cd backend
$ npm install
```

### Set Up Environment Variables

```
PORT=3000
ASSEMBLY_AI_KEY=<Your AssemblyAI Key>
TEST_MONGODB_URI=<Your Test MongoDB URI>
MONGODB_URI=<Your Production MongoDB URI>
SECRET=<Your Secret String>
```

### Start the Application

```
$ npm start
```

## Live Demo

You can try the application here: [Voice Proficiency Website](https://voice-proficiency.onrender.com)

## Built With

- [Express.js](https://expressjs.com/) - Backend framework for REST API.
- [React](https://reactjs.org/) - Frontend library for building user interfaces.
- [Redux](https://redux.js.org/) - Global state management.
- [Node.js](https://nodejs.org/) - Runtime environment.
- [AssemblyAI](https://www.assemblyai.com/) - Video transcription services.
