import React, { useContext } from "react";

const UIContext = React.createContext({});

export default UIContext;

export const useUIContext = () => {
    return useContext(UIContext);
};
