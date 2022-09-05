import React from "react";
import { Link } from "react-router-dom";
import { usePlayerContext } from "../store/PlayerContext";
import PlayerInfo from "../components/PlayerInfo";
import Field from "../components/field";
import { useUIContext } from "../store/UIcontext";

const Game = () => {
    const { player1, player2, addStep, clearGame, againGame, winner } =
        usePlayerContext();
    const { setAgain } = useUIContext();

    const fields = Array(9).fill("");
    return (
        <div className="game">
            <div className="round">
                <PlayerInfo playerInfo={player1} />
                <PlayerInfo playerInfo={player2} />
            </div>
            <div className={`gameField ${winner}`}>
                {fields.map((_, index) => (
                    <Field key={index} index={index} addStep={addStep} />
                ))}
            </div>
            <div className={`game__buttons ${winner !== "" && "showBtn"}`}>
                <Link
                    to={"/"}
                    className="homeButton button"
                    onClick={() => {
                        clearGame();
                    }}
                >
                    Home
                </Link>
                <button
                    className="againButton button"
                    onClick={() => {
                        setAgain(true);
                        againGame();
                    }}
                >
                    again
                </button>
            </div>
        </div>
    );
};

export default Game;
