import React, { useEffect, useState } from "react";
import { usePlayerContext } from "../store/PlayerContext";
import { useUIContext } from "../store/UIcontext";
import icons from "./Icons";

const Field = ({ index, addStep }) => {
    const { player1, player2 } = usePlayerContext();
    const { again, setAgain } = useUIContext();
    const [stepIcon, setStepIcon] = useState("");

    const addIconHandler = () => {
        setAgain(false);
        if (stepIcon !== "") return;
    };

    useEffect(() => {
        if (again) {
            setStepIcon("");
        }
    }, [again]);

    useEffect(() => {
        if (player1.step.includes(index)) {
            setStepIcon(icons[player1.player]?.[player1.imgIndex]);
        } else if (player2.step.includes(index)) {
            setStepIcon(icons[player2.player]?.[player2.imgIndex]);
        } else {
            setStepIcon("");
        }
    }, [player1.step, player2.step]);

    return (
        <div
            className="field"
            onClick={() => {
                addStep(index);
                addIconHandler();
            }}
        >
            {stepIcon}
        </div>
    );
};

export default Field;
