import { Location } from "../types/boardTypes";

interface PlayerProps {
  position: Location;
  owner: "red" | "blue";
  isSelectedPiece: boolean;
  handlePieceClick: (location: Location, player: "red" | "blue") => void;
  isQueen: boolean;
}

const player = ({
  position,
  owner,
  isSelectedPiece,
  handlePieceClick,
  isQueen,
}: PlayerProps) => {
  return (
    <div
      style={{
        border: isSelectedPiece ? "2px solid gold" : "none",
        justifyContent: "center",
      }}
      id={`${position[0]}-${position[1]}`}
      className={`${owner}-player`}
      onClick={() => {
        handlePieceClick(position, owner);
      }}
    >
      {isQueen ? (
        <img
          style={{ width: "70%", height: "90%" }}
          alt="queen"
          src="https://upload.wikimedia.org/wikipedia/commons/9/90/Font_Awesome_5_solid_crown.svg"
        />
      ) : null}
    </div>
  );
};

export default player;
