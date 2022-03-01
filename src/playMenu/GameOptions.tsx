import { useNavigate } from "react-router-dom";
import {
  customizePath,
  offlineGamePath,
  onlineChckersPath,
} from "../constants/appPaths";
import { socketApiBaseUrl } from "../constants/socket";
import { useSelector, useStore } from "react-redux";
import { MainStore } from "../redux/mainStore";
import { joinedGame, setGameToken } from "../redux/slices/socketSlice";
import {
  ICostumizationData,
  IGameToken,
  INewGameResponse,
} from "../types/socketTypes";
import axios from "axios";
import { useEffect, useRef } from "react";
import {
  setGamePlayers,
  setGamePositions,
  setTimers,
  setTurn,
  setUsersColor,
} from "../redux/slices/onlineCheckersSlice";
import { colorOne, colorTwo } from "../constants/board";
import { joinSocketGame } from "../socketLogic/initialConnection";
import { authAxiosConfig } from "../constants/axios";
import StatisticsView from "./statistics/StatsMainScreen";
import fetchApi from "../generalUtils/axios";
import { backgroundDict } from "../constants/customizationDict";
import { setBackground } from "../redux/slices/environmentCustomizationSlice";

const GameOptions = () => {
  const socketSlice = useSelector((state: MainStore) => state.socket);
  const gameToken = socketSlice.gameToken;
  const userId = socketSlice.userId;
  const costumizationSlice = useSelector(
    (state: MainStore) => state.customization
  );
  const backgroundSetting = costumizationSlice.background;
  const mainStore = useStore();
  const navigate = useNavigate();

  const tokenRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateUserCustomization = async () => {
      const customizeDataRes = await fetchApi<{
        styleCustomization: ICostumizationData;
      }>(socketApiBaseUrl, "customize", "get", authAxiosConfig());
      if (!customizeDataRes.success) {
        return;
      }
      mainStore.dispatch(
        setBackground(customizeDataRes.data.styleCustomization.background)
      );
    };
    updateUserCustomization();
  }, [userId]);

  useEffect(() => {
    const rootElement = document.getElementById("root") as HTMLElement;
    rootElement.style.backgroundImage = `url('${backgroundDict[backgroundSetting]}')`;
  }, [backgroundSetting]);

  const handleOnlineGameCreation = async () => {
    try {
      const { data }: { data: IGameToken } = await axios.get(
        `${socketApiBaseUrl}/game/token`,
        authAxiosConfig()
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
        },
        authAxiosConfig()
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
    console.log({ gameData });
    mainStore.dispatch(joinedGame(true));
    mainStore.dispatch(setGamePositions(gameData.gameinfo.positions));
    mainStore.dispatch(
      setUsersColor(
        gameData.playerOne?.id === socketSlice.userId ? colorOne : colorTwo
      )
    );
    mainStore.dispatch(
      setGamePlayers({
        playerOne: gameData.playerOne && gameData.playerOne.userName,
        playerTwo: gameData.playerTwo && gameData.playerTwo.userName,
      })
    );
    mainStore.dispatch(
      setTimers({
        playerOne: gameData.playerOne && gameData.playerOne.time,
        playerTwo: gameData.playerTwo && gameData.playerTwo.time,
      })
    );
    mainStore.dispatch(setTurn(colorOne));
  };

  return (
    <div className="game-options-menu">
      <h1>game options</h1>
      <div>
        <button className="generate-token" onClick={handleOnlineGameCreation}>
          generate game token
        </button>
        <button className="play-localy" onClick={goToOfflineGame}>
          play localy
        </button>
      </div>
      <StatisticsView />
      <div>
        <label htmlFor="join-game">join game</label>
        <input
          type="text"
          id="join-game"
          placeholder="game token"
          ref={tokenRef}
        />
        <button
          className="join"
          onClick={() => {
            if (tokenRef.current === null) {
              return alert("please enter game token");
            }
            handleJoinGame(tokenRef.current.value);
          }}
        >
          join
        </button>
      </div>
      <div>
        {gameToken ? (
          <div className="game-token">
            game token <span>{gameToken}</span>
          </div>
        ) : null}
        <div className="go-to-customize">
          <button onClick={() => navigate(customizePath)}>
            customize environment
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOptions;
