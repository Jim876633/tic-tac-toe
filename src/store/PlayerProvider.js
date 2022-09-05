import React, { useReducer, useState, useEffect } from "react";
import PlayerContext from "./PlayerContext";
import { defaultPlayerState, playerReducer } from "./reducer";

const winArg = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const isWinner = (playerStep = []) => {
    const step = [...playerStep];
    if (step.length < 3) return false;
    // The array that wrap all player's step are possible to win combination
    const stepWinArg = step
        .map((step) =>
            winArg
                .filter((arg) => arg.includes(step))
                .map((arg) => arg.join(""))
        )
        .reduce((total, arg) => [...total, ...arg], []);
    // Calculate each win combination appear times, three times is win.
    const stepWinObj = stepWinArg.reduce((total, num) => {
        if (total[num]) {
            total[num] += 1;
        } else {
            total[num] = 1;
        }
        return total;
    }, {});
    const stepWinCal = Object.values(stepWinObj);
    if (stepWinCal.includes(3)) {
        return true;
    }
    return false;
};

const PlayerProvider = ({ children }) => {
    const [playerState, dispatchPlayerAction] = useReducer(
        playerReducer,
        defaultPlayerState
    );
    const [winner, setWinner] = useState("");
    const [robotChangeTurn, setRobotChangeTurn] = useState(false);

    // Use randomNumber to simulate the robot.
    const robotAutoStep = () => {
        const randomIndex = (number) => {
            return Math.floor(Math.random() * number);
        };
        const initialNumberArg = Array(9)
            .fill("")
            .map((_, index) => index);
        const filterNumberArg = initialNumberArg.filter(
            (number) =>
                !playerState.player1.step.includes(number) &&
                !playerState.player2.step.includes(number)
        );
        const randomNumber =
            filterNumberArg[randomIndex(filterNumberArg.length)];
        dispatchPlayerAction({ type: "ADD_STEP", number: randomNumber });
        if (
            playerState.player1.player === "robot" &&
            playerState.player2.player === "robot"
        ) {
            setRobotChangeTurn(true);
        } else {
            setRobotChangeTurn(false);
        }
    };
    //dispatch function=========================================
    const choseGameHandler = (name, player) => {
        dispatchPlayerAction({
            type: "CHOSE_PLAYER",
            player: player,
            name: name,
        });
    };
    const startGameHandler = () => {
        if (playerState.player1.player === "robot") {
            robotAutoStep();
        }
    };
    const addStepHandler = (number) => {
        dispatchPlayerAction({ type: "ADD_STEP", number: number });
        if (
            playerState.player1.step.includes(number) ||
            playerState.player2.step.includes(number)
        )
            return;
        if (
            playerState.player1.player === "robot" ||
            playerState.player2.player === "robot"
        ) {
            setRobotChangeTurn(true);
        }
    };
    const claerGameHandler = () => {
        setRobotChangeTurn(false);
        setWinner("");
        dispatchPlayerAction({ type: "CLEAR_GAME" });
    };
    const againGameHandler = () => {
        setRobotChangeTurn(false);
        setWinner("");
        dispatchPlayerAction({ type: "AGAIN_GAME" });
        if (playerState.player1.player === "robot") {
            setRobotChangeTurn(true);
        }
    };
    const changeImageIndexHandler = (name, number, position) => {
        console.log(name, number, position);
        dispatchPlayerAction({
            type: "CHANGE_IMGINDEX",
            name: name,
            totalImage: number,
            position: position,
        });
    };

    //useEffect==============================================
    useEffect(() => {
        let endGame = false;
        const player1Win = isWinner(playerState.player1.step);
        const player2Win = isWinner(playerState.player2.step);
        const totalStep =
            playerState.player1.step.length + playerState.player2.step.length;
        if (player1Win || player2Win || totalStep === 9) {
            player1Win
                ? setWinner(() => "player1")
                : player2Win
                ? setWinner(() => "player2")
                : setWinner(() => "tie");
            endGame = true;
        }
        if (robotChangeTurn == true && !endGame) {
            console.log("hi");
            if (
                playerState.player1.player === "robot" ||
                playerState.player2.player === "robot"
            ) {
                robotAutoStep();
            }
        }
    }, [playerState.player1.step, playerState.player2.step]);
    const playerContext = {
        player1: playerState.player1,
        player2: playerState.player2,
        winner,
        chosePlayer: choseGameHandler,
        addStep: addStepHandler,
        startGame: startGameHandler,
        clearGame: claerGameHandler,
        againGame: againGameHandler,
        changeImageIndex: changeImageIndexHandler,
    };

    return (
        <PlayerContext.Provider value={playerContext}>
            {children}
        </PlayerContext.Provider>
    );
};
export default PlayerProvider;
