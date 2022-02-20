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
import { useSelector } from "react-redux";
import { MainStore } from "./redux/mainStore";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  const socketSlice = useSelector((state: MainStore) => state.socket);
  const userId = socketSlice.userId;

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
