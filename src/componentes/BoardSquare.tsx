import Player from "./Player";
import { Location } from "../types/boardTypes";
import { Dispatch } from "react";
import PossibleMoveIndicator from "./PossibleMoveIndicator";

interface BoardSqaureProps {
  location: Location;
  color: "light" | "dark";
  player: "red" | "blue" | "indicator" | undefined;
  setIndiCatorLocations: Dispatch<Location[]>;
  setPosition: Dispatch<{ red: Location[]; blue: Location[] }>;
  setSelectedPiece: Dispatch<React.SetStateAction<Location | null>>;
  isSelectedPiece: boolean;
  takeTurn: (newLocation: Location) => void;
}

const BoardSqaure = ({
  location,
  color,
  player,
  setIndiCatorLocations,
  setPosition,
  setSelectedPiece,
  isSelectedPiece,
  takeTurn,
}: BoardSqaureProps) => {
  const handlePieceClick = (location: Location, player: "red" | "blue") => {
    setSelectedPiece(location);
    player === "red"
      ? setIndiCatorLocations([
          [location[0] + 1, location[1] + 1],
          [location[0] + 1, location[1] - 1],
        ])
      : setIndiCatorLocations([
          [location[0] - 1, location[1] + 1],
          [location[0] - 1, location[1] - 1],
        ]);
  };

  return (
    <div className={color}>
      {/* {location[0]}, {location[1]} */}
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
