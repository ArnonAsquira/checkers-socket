import { useNavigate } from "react-router-dom";
import {
  customizePath,
  offlineGamePath,
  onlineChckersPath,
} from "../constants/appPaths";
import { socketApiBaseUrl } from "../constants/socket";
import { useSelector, useStore } from "react-redux";
import { MainStore } from "../redux/mainStore";
import { ICostumizationData, INewGameResponse } from "../types/socketTypes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { joinSocketGame } from "../socketLogic/initialConnection";
import { authAxiosConfig } from "../constants/axios";
import StatisticsView from "./statistics/StatsMainScreen";
import fetchApi from "../generalUtils/axios";
import { backgroundDict } from "../constants/customizationDict";
import { setBackground } from "../redux/slices/environmentCustomizationSlice";
import { updateInitialGameData } from "./services/game";
import Swal from "sweetalert2";
import CreateGameDiaolog from "./CreateGameDialog";

const GameOptions = () => {
  const [openCreateGameDialog, setOpenCreateGameDialog] =
    useState<boolean>(false);

  const socketSlice = useSelector((state: MainStore) => state.socket);
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
      const customizationObject = customizeDataRes.data.styleCustomization;
      mainStore.dispatch(setBackground(customizationObject.background));
    };
    updateUserCustomization();
  }, [userId]);

  useEffect(() => {
    const rootElement = document.getElementById("root") as HTMLElement;
    rootElement.style.backgroundImage = `url('${backgroundDict[backgroundSetting]}')`;
  }, [backgroundSetting]);

  const goToOfflineGame = () => {
    navigate(offlineGamePath);
  };

  const handleJoinGame = async (gameToken: string) => {
    if (userId === null) {
      return Swal.fire("please login");
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
      updateInitialGameData(data, socketSlice.userId);
      joinSocketGame(data.gameId, userId);
      goToOnlineGame();
    } catch (err: any) {
      console.log(err);
      Swal.fire(err && err.response && err.response.data);
    }
  };

  const goToOnlineGame = () => {
    navigate(onlineChckersPath);
  };

  return (
    <div className="game-options-menu">
      <h1>game options</h1>
      <CreateGameDiaolog open={openCreateGameDialog} />
      <div>
        <button
          className="generate-token"
          onClick={() => setOpenCreateGameDialog(!openCreateGameDialog)}
        >
          create game
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
              return Swal.fire("please enter game token");
            }
            handleJoinGame(tokenRef.current.value);
          }}
        >
          join
        </button>
      </div>
      <div>
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
