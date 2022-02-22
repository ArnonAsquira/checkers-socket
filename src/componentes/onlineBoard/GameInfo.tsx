import { FC } from "react";
import { PlatyerColors } from "../../types/boardTypes";
import { IActiveGamePlayers, IPlayerTimers } from "../../types/socketTypes";

interface IGameInfoProps {
  currentTurn: PlatyerColors | null;
  players: IActiveGamePlayers;
  timers: IPlayerTimers;
}

const GameInfo: FC<IGameInfoProps> = ({ currentTurn, players, timers }) => {
  return (
    <div className="game-info">
      <div className="current-turn">
        current turn:
        <span style={currentTurn !== null ? { color: currentTurn } : {}}>
          {currentTurn}
        </span>
        <div>time left: {timers.playerOne}</div>
      </div>
      <div className="player">
        <span className="one">player one:</span> {players.playerOne}
      </div>
      <div className="player">
        <span className="two">player two:</span>
        {players.playerTwo}
        <div>time left: {timers.playerTwo}</div>
      </div>
    </div>
  );
};

export default GameInfo;
