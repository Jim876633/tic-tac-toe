import React, { useState } from "react";
import UIContext from "./UIcontext";

const UIProvider = ({ children }) => {
    const [again, setAgain] = useState(false);

    const uiContext = {
        again,
        setAgain,
    };

    return (
        <UIContext.Provider value={uiContext}>{children}</UIContext.Provider>
    );
};
export default UIProvider;
