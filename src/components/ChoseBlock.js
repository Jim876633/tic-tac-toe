import React from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { usePlayerContext } from "../store/PlayerContext";
import icons from "./Icons";
const { person, robot } = icons;

const ChoseBlock = ({ title }) => {
    const { chosePlayer, player1, player2, changeImageIndex } =
        usePlayerContext();

    const player = player1.name === title ? player1.player : player2.player;

    const iconsNumber =
        player === "person" ? icons.person.length : icons.robot.length;

    const imgIndex =
        player1.name === title ? player1.imgIndex : player2.imgIndex;
    return (
        <div className="player">
            <div className="player__title">{title}</div>
            <div className="player__imageBlock">
                <div
                    className="imageButton imageButton--left button"
                    onClick={() => {
                        changeImageIndex(title, iconsNumber, "left");
                    }}
                >
                    <MdArrowLeft />
                </div>
                <div
                    className="imageButton imageButton--right button"
                    onClick={() => {
                        changeImageIndex(title, iconsNumber, "right");
                    }}
                >
                    <MdArrowRight />
                </div>
                {player === "person" ? person[imgIndex] : robot[imgIndex]}
            </div>
            <div className="player__buttons">
                <button
                    className={`button ${player === "person" && "chose"}`}
                    onClick={() => {
                        chosePlayer(title, "person");
                    }}
                >
                    person
                </button>
                <button
                    className={`button ${player === "robot" && "chose"}`}
                    onClick={() => {
                        chosePlayer(title, "robot");
                    }}
                >
                    robot
                </button>
            </div>
        </div>
    );
};

export default ChoseBlock;
