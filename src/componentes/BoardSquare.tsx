import Player from "./Player";
import { Location } from "../types/boardTypes";
import { Dispatch } from "react";
import PossibleMoveIndicator from "./PossibleMoveIndicator";
const BoardSqaure = ({
  location,
  color,
  player,
  setIndiCatorLocations,
  setPosition,
}: {
  location: Location;
  color: "light" | "dark";
  player: "red" | "blue" | "indicator" | undefined;
  setIndiCatorLocations: Dispatch<Location[]>;
  setPosition: Dispatch<{ red: Location[]; blue: Location[] }>;
}) => {
  const takeTurn = () => {};
  return (
    <div className={color}>
      {location[0]}, {location[1]}
      {player ? (
        player === "indicator" ? (
          <PossibleMoveIndicator />
        ) : (
          <Player
            position={location}
            owner={player}
            setIndiCatorLocations={setIndiCatorLocations}
          />
        )
      ) : null}
    </div>
  );
};

export default BoardSqaure;
