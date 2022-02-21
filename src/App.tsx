import Board from "./componentes/Board";
import SignUpApp from "./login_src/App";
import PlayMenu from "./playMenu/Menu";
import GameOptions from "./playMenu/GameOptions";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  gameOptionsPath,
  offlineGamePath,
  onlineChckersPath,
  playMenuPath,
} from "./constants/appPaths";
import OnlineBoard from "./componentes/onlineBoard/Board";
import { useSelector, useStore } from "react-redux";
import { MainStore } from "./redux/mainStore";
import { useEffect } from "react";
import axios from "axios";
import { socketApiBaseUrl } from "./constants/socket";
import { authAxiosConfig } from "./constants/axios";
import { setUserId } from "./redux/slices/socketSlice";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const mainStore = useStore();
  const socketSlice = useSelector((state: MainStore) => state.socket);
  const userId = socketSlice.userId;
  const historySlice = useSelector((state: MainStore) => state.history);

  useEffect(() => {
    const establishJwtLogin = async () => {
      try {
        const { data }: { data: { autenitcated: boolean; userId: string } } =
          await axios.get(`${socketApiBaseUrl}/jwtaccess`, authAxiosConfig());
        if (data.autenitcated) {
          mainStore.dispatch(setUserId(data.userId));
          navigate("/gameoptions");
        }
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };
    establishJwtLogin();
  }, []);

  useEffect(() => {
    if (userId === null) {
      navigate("/");
    }
  }, [userId]);

  return (
    <Routes>
      <Route path="/" element={<SignUpApp />} />
      <Route path={playMenuPath} element={<PlayMenu />} />
      <Route path={gameOptionsPath} element={<GameOptions />} />
      <Route
        path={offlineGamePath}
        element={
          <div>
            <Board />
          </div>
        }
      />
      <Route path={onlineChckersPath} element={<OnlineBoard />} />
    </Routes>
  );
};

export default App;
