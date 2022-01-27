import Player from "./Player";
import { IPieceInfoObject, Location } from "../types/boardTypes";
import { Dispatch } from "react";
import PossibleMoveIndicator from "./PossibleMoveIndicator";

interface BoardSqaureProps {
  location: Location;
  color: "light" | "dark";
  player: "red" | "blue" | "indicator" | undefined;
  setSelectedPiece: Dispatch<
    React.SetStateAction<IPieceInfoObject | null>
  > | null;
  isSelectedPiece: boolean;
  takeTurn: (newLocation: Location) => void;
  isQueen: boolean;
}

const BoardSqaure = ({
  location,
  color,
  player,
  setSelectedPiece,
  isSelectedPiece,
  takeTurn,
  isQueen,
}: BoardSqaureProps) => {
  const handlePieceClick = (location: Location, player: "red" | "blue") => {
    if (setSelectedPiece === null) return;
    setSelectedPiece({ location, isQueen: isQueen });
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
            handlePieceClick={isQueen ? handlePieceClick : handlePieceClick}
            isQueen={isQueen}
          />
        )
      ) : null}
    </div>
  );
};

export default BoardSqaure;
