import Player from "../Player";
import { IPieceInfoObject, Location } from "../../types/boardTypes";
import PossibleMoveIndicator from "../PossibleMoveIndicator";
import { useSelector } from "react-redux";
import { MainStore } from "../../redux/mainStore";
import { logosDict } from "../../constants/customizationDict";

interface BoardSqaureProps {
  location: Location;
  color: "light" | "dark";
  player: "red" | "blue" | "indicator" | undefined;
  setSelectedPiece: (piece: IPieceInfoObject) => void | null;
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
  const gamaSlice = useSelector(
    (state: MainStore) => state.onlineCheckersBoard
  );
  const logos = gamaSlice.logos;

  return (
    <div className={color} style={{ height: "70px", width: "70px" }}>
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
            logo={
              player === "red"
                ? logos.red && logosDict[logos.red]
                : logos.blue && logosDict[logos.blue]
            }
          />
        )
      ) : null}
    </div>
  );
};

export default BoardSqaure;
