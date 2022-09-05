import { Link } from "react-router-dom";

import ChoseBlock from "../components/ChoseBlock";
import { usePlayerContext } from "../store/PlayerContext";

const Home = () => {
    const { startGame } = usePlayerContext();
    return (
        <div className="home">
            <div className="title">Tic-Tac-Toe</div>
            <div className="chose-section">
                <ChoseBlock title="player1" />
                <span className="vs-text">v.s.</span>
                <ChoseBlock title="player2" />
            </div>
            <Link
                to={"/game"}
                className="startGame"
                onClick={() => {
                    startGame();
                }}
            >
                Game start
            </Link>
        </div>
    );
};

export default Home;
