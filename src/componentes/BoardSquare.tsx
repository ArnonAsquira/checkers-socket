import Player from "./Player";
import { Location } from "../types/boardTypes";
import { Dispatch } from "react";
import PossibleMoveIndicator from "./PossibleMoveIndicator";

interface BoardSqaureProps {
  location: Location;
  color: "light" | "dark";
  player: "red" | "blue" | "indicator" | undefined;
  setSelectedPiece: Dispatch<React.SetStateAction<Location | null>>;
  isSelectedPiece: boolean;
  takeTurn: (newLocation: Location) => void;
}

const BoardSqaure = ({
  location,
  color,
  player,
  setSelectedPiece,
  isSelectedPiece,
  takeTurn,
}: BoardSqaureProps) => {
  const handlePieceClick = (location: Location, player: "red" | "blue") => {
    setSelectedPiece(location);
  };

  return (
    <div className={color}>
      {location[0]}, {location[1]}
      {player ? (
        player === "indicator" ? (
          <PossibleMoveIndicator location={location} handleClick={takeTurn} />
        ) : (
          <Player
            position={location}
            owner={player}
            isSelectedPiece={isSelectedPiece}
            handlePieceClick={handlePieceClick}
          />
        )
      ) : null}
    </div>
  );
};

export default BoardSqaure;
