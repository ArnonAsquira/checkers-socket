import { useNavigate } from "react-router-dom";
import { offlineGamePath, onlineChckersPath } from "../constants/appPaths";
import { socketApiBaseUrl } from "../constants/socket";
import { useSelector, useStore } from "react-redux";
import { MainStore } from "../redux/mainStore";
import { joinedGame, setGameToken } from "../redux/slices/socketSlice";
import { IGameToken, INewGameResponse } from "../types/socketTypes";
import axios from "axios";
import { useRef } from "react";
import {
  setGamePlayers,
  setGamePositions,
  setTurn,
  setUsersColor,
} from "../redux/slices/onlineCheckersSlice";
import { colorOne, colorTwo } from "../constants/board";
import { joinSocketGame } from "../socketLogic/initialConnection";

const GameOptions = () => {
  const socketSlice = useSelector((state: MainStore) => state.socket);
  const gameToken = socketSlice.gameToken;
  const userId = socketSlice.userId;
  const mainStore = useStore();
  const navigate = useNavigate();

  const tokenRef = useRef<HTMLInputElement>(null);

  const handleOnlineGameCreation = async () => {
    try {
      const { data }: { data: IGameToken } = await axios.get(
        `${socketApiBaseUrl}/game/token`
      );
      mainStore.dispatch(setGameToken(data.gameToken));
    } catch (e) {
      return alert("could not connect to servers");
    }
  };

  const goToOfflineGame = () => {
    navigate(offlineGamePath);
  };

  const handleJoinGame = async (gameToken: string) => {
    if (userId === null) {
      return alert("please login");
    }
    try {
      const { data }: { data: INewGameResponse } = await axios.post(
        `${socketApiBaseUrl}/game/join`,
        {
          userId: userId,
          gameToken,
        }
      );
      updateInitialGameData(data);
      joinSocketGame(data.gameId, userId);
      goToOnlineGame();
    } catch (err: any) {
      console.log(err);
      alert(err && err.response && err.response.data);
    }
  };

  const goToOnlineGame = () => {
    navigate(onlineChckersPath);
  };

  const updateInitialGameData = (gameData: INewGameResponse) => {
    mainStore.dispatch(joinedGame(true));
    mainStore.dispatch(setGamePositions(gameData.gameinfo.positions));
    mainStore.dispatch(
      setUsersColor(
        gameData.playerOne === socketSlice.userId ? colorOne : colorTwo
      )
    );
    mainStore.dispatch(
      setGamePlayers({
        playerOne: gameData.playerOne,
        playerTwo: gameData.playerTwo,
      })
    );
    mainStore.dispatch(setTurn(colorOne));
  };

  return (
    <div>
      <button onClick={handleOnlineGameCreation}>generate game token</button>
      <button onClick={goToOfflineGame}>play localy</button>
      <label htmlFor="join-game">join game</label>
      <input
        type="text"
        id="join-game"
        placeholder="game token"
        ref={tokenRef}
      />
      <button
        onClick={() => {
          if (tokenRef.current === null) {
            return alert("please enter game token");
          }
          handleJoinGame(tokenRef.current.value);
        }}
      >
        join
      </button>
      {gameToken ? <div>game token {gameToken}</div> : null}
    </div>
  );
};

export default GameOptions;
