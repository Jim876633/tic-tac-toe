import React from "react";
import icons from "./Icons";

const PlayerInfo = ({ playerInfo }) => {
    const { name, player, imgIndex } = playerInfo;

    return (
        <div className="round__player">
            <div className="player__imageBlock">
                {icons[player]?.[imgIndex]}
            </div>
            <div className="player__text">
                {name} : {player}
            </div>
        </div>
    );
};

export default PlayerInfo;
