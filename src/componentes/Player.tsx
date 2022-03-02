import { Location } from "../types/boardTypes";

interface PlayerProps {
  position: Location;
  owner: "red" | "blue";
  isSelectedPiece: boolean;
  handlePieceClick: (location: Location, player: "red" | "blue") => void;
  isQueen: boolean;
  logo?: string | null;
}

const player = ({
  position,
  owner,
  isSelectedPiece,
  handlePieceClick,
  isQueen,
  logo,
}: PlayerProps) => {
  return (
    <div
      style={{
        display: "flex",
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
      ) : logo ? (
        <span
          style={{
            fontSize: "3rem",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          {logo}
        </span>
      ) : null}
    </div>
  );
};

export default player;
