# Voice Proficiency

This is a web application for users looking to improve their speech. It allows them to upload audio files, automatically transcribing them and highlighting words which do not meet the threshold.

Based on the popular masterclass by Vinh Giang

![image](./demo/demo.gif)

## To Run Locally

```
$ pip install git+https://github.com/openai/whisper.git
$ git clone https://github.com/Ze-hs/voice_profficiency.git
$ cd voice_profficiency/backend
$ npm start
```

## Built With

-   [Express.js](https://expressjs.com/) - Executes backend logic via REST API
-   [React](https://reactjs.org/) - Used for the frontend
-   [Node.js](https://nodejs.org/) - The runtime environment used
