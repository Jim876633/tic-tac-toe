import React, { useContext } from "react";

const PlayerContext = React.createContext({
    player1: {},
    player2: {},
    winner: "",
    chosePlayer: () => {},
    addStep: () => {},
    clearGame: () => {},
    againGame: () => {},
});
export default PlayerContext;

export const usePlayerContext = () => {
    return useContext(PlayerContext);
};
