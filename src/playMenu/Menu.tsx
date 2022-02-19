import { useNavigate } from "react-router-dom";
import { gameOptionsPath } from "../constants/appPaths";

const Menu = () => {
  const navigate = useNavigate();

  const goToGameOption = () => {
    navigate(gameOptionsPath);
  };

  return (
    <div>
      <button onClick={goToGameOption}>play checkers</button>
    </div>
  );
};

export default Menu;
