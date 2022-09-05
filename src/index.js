import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import PlayerProvider from "./store/PlayerProvider";
import UIProvider from "./store/UIProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <PlayerProvider>
            <UIProvider>
                <App />
            </UIProvider>
        </PlayerProvider>
    </React.StrictMode>
);
