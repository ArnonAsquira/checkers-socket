import { FC } from "react";
import { useSelector } from "react-redux";
import { MainStore } from "../../redux/mainStore";
import { PlatyerColors } from "../../types/boardTypes";
import { IActiveGamePlayers, IPlayerTimers } from "../../types/socketTypes";

interface IGameInfoProps {
  currentTurn: PlatyerColors | null;
  players: IActiveGamePlayers;
  timers: IPlayerTimers;
}

const GameInfo: FC<IGameInfoProps> = ({ currentTurn, players, timers }) => {
  const socketSlice = useSelector((state: MainStore) => state.socket);

  const secondsToMinutes = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} : ${seconds - minutes * 60}`;
  };

  return (
    <div className="game-info">
      <div>game token: {socketSlice.gameToken}</div>
      <div className="current-turn">
        current turn:
        <span style={currentTurn !== null ? { color: currentTurn } : {}}>
          {currentTurn}
        </span>
      </div>
      <div className="player">
        <span className="one">player one:</span>
        {players.playerOne}{" "}
        <div className="timer">
          {timers.playerOne && secondsToMinutes(timers.playerOne)}
        </div>
      </div>
      <div className="player">
        <span className="two">player two:</span>
        {players.playerTwo}
        <div className="timer">
          {timers.playerTwo && secondsToMinutes(timers.playerTwo)}
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
