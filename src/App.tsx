import Board from "./componentes/Board";
import SignUpApp from "./login_src/App";
import PlayMenu from "./playMenu/Menu";
import GameOptions from "./playMenu/GameOptions";
import { Routes, Route } from "react-router-dom";
import {
  gameOptionsPath,
  offlineGamePath,
  onlineChckersPath,
  playMenuPath,
} from "./constants/appPaths";
import OnlineBoard from "./componentes/onlineBoard/Board";

const App = () => {
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
