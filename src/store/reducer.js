export const defaultPlayerState = {
    player1: {
        name: "player1",
        player: "person",
        imgIndex: 0,
        option: "",
        step: [],
    },
    player2: {
        name: "player2",
        player: "robot",
        imgIndex: 0,
        option: "",
        step: [],
    },
};

export const playerReducer = (state, action) => {
    if (action.type === "CHOSE_PLAYER") {
        const updatePlayer = {
            ...state[action.name],
            player: action.player,
            imgIndex: 0,
        };
        return { ...state, [action.name]: updatePlayer };
    }
    if (action.type === "ADD_STEP") {
        const player1_Step = state.player1.step;
        const player2_Step = state.player2.step;
        if (
            player1_Step.includes(action.number) ||
            player2_Step.includes(action.number)
        )
            return state;

        // set PlayerTurn and Add current step (Player1 default first )

        let playerTurn;
        if (player1_Step.length === player2_Step.length) {
            playerTurn = "player1";
        } else {
            playerTurn = "player2";
        }
        const playerStep = state[playerTurn].step;
        const newStep = [...playerStep, action.number];
        return {
            ...state,
            [playerTurn]: { ...state[playerTurn], step: newStep },
        };
    }
    if (action.type === "CLEAR_GAME") {
        return defaultPlayerState;
    }
    if (action.type === "AGAIN_GAME") {
        return {
            ...state,
            player1: { ...state.player1, step: [] },
            player2: { ...state.player2, step: [] },
        };
    }
    if (action.type === "CHANGE_IMGINDEX") {
        const name = action.name;
        const total = action.totalImage;
        const position = action.position;
        const prevIndex = state[name].imgIndex;
        const updatePlayer = (number) => {
            return { [name]: { ...state[name], imgIndex: number } };
        };
        if (position === "right") {
            if (prevIndex === total - 1) {
                return {
                    ...state,
                    ...updatePlayer(0),
                };
            }
            return {
                ...state,
                ...updatePlayer(prevIndex + 1),
            };
        }
        if (position === "left") {
            if (prevIndex == 0) {
                return {
                    ...state,
                    ...updatePlayer(total - 1),
                };
            }
            return {
                ...state,
                ...updatePlayer(prevIndex - 1),
            };
        }
    }
};
