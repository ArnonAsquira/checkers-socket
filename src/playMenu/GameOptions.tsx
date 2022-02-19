import { useNavigate } from "react-router-dom";
import { offlineGamePath, onlineChckersPath } from "../constants/appPaths";
import { socketApiBaseUrl } from "../constants/socket";
import { useSelector, useStore } from "react-redux";
import { MainStore } from "../redux/mainStore";
import { joinedGame, setGameToken } from "../redux/slices/socketSlice";
import { IGameToken } from "../types/socketTypes";
import axios from "axios";
import { useRef } from "react";

const GameOptions = () => {
  const socketSlice = useSelector((state: MainStore) => state.socket);
  const gameToken = socketSlice.gameToken;
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

  const goToOnlineGame = async (gameToken: string) => {
    try {
      const { data } = await axios.post(`${socketApiBaseUrl}/game/join`, {
        userId: socketSlice.userId,
        gameToken,
      });
      console.log(data);
      mainStore.dispatch(joinedGame(true));
      navigate(onlineChckersPath);
    } catch (err: any) {
      console.log(err.response);
      return alert(err && err.response && err.response.data);
    }
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
          goToOnlineGame(tokenRef.current.value);
        }}
      >
        join
      </button>
      {gameToken ? <div>game token {gameToken}</div> : null}
    </div>
  );
};

export default GameOptions;
