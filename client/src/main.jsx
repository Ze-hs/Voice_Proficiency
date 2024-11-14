import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";

import store from "./reducers/store.js";

// Material & CSS imports
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./styles/index.css";

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat",
    },
});

createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
);
