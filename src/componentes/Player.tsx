import { Dispatch } from "react";
import { Location } from "../types/boardTypes";

const player = ({
  position,
  owner,
  setIndiCatorLocations,
}: {
  position: Location;
  owner: "red" | "blue";
  setIndiCatorLocations: Dispatch<Location[]>;
}) => {
  const showPossibleMoves = () => {
    owner === "red"
      ? setIndiCatorLocations([
          [position[0] + 1, position[1] + 1],
          [position[0] + 1, position[1] - 1],
        ])
      : setIndiCatorLocations([
          [position[0] - 1, position[1] + 1],
          [position[0] - 1, position[1] - 1],
        ]);
  };
  return (
    <div
      className={`${owner}-player`}
      onClick={() => showPossibleMoves()}
    ></div>
  );
};

export default player;
