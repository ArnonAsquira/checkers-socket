import Board from "./componentes/Board";
import SignUpApp from "./src/App";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpApp />} />
      <Route
        path="/game"
        element={
          <div>
            <Board />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
