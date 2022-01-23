import { Location } from "../types/boardTypes";

interface PlayerProps {
  position: Location;
  owner: "red" | "blue";
  isSelectedPiece: boolean;
  handlePieceClick: (location: Location, player: "red" | "blue") => void;
}

const player = ({
  position,
  owner,
  isSelectedPiece,
  handlePieceClick,
}: PlayerProps) => {
  return (
    <div
      style={{ border: isSelectedPiece ? "2px solid gold" : "none" }}
      className={`${owner}-player`}
      onClick={() => {
        handlePieceClick(position, owner);
      }}
    ></div>
  );
};

export default player;
