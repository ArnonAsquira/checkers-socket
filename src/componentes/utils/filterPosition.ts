import { Dispatch } from "react";
import {
  IBoardPositions,
  Location,
  IndicatorInfo,
} from "../../types/boardTypes";
import arrayEqual from "./arrayEqual";

const filterPostion = (
  setPositions: Dispatch<React.SetStateAction<IBoardPositions>>,
  turn: "red" | "blue",
  isQueen: boolean,
  selectedPiece: Location,
  newLocation: Location,
  reachedEndOfBoard: boolean,
  indicatorInfo: IndicatorInfo | null
) => {
  const oppositeColor = turn === "red" ? "blue" : "red";
  setPositions((positions) => ({
    ...positions,
    [turn]: isQueen
      ? positions[turn]
      : positions[turn]
          .filter(
            (playerLocation) => !arrayEqual(playerLocation, selectedPiece)
          )
          .concat(reachedEndOfBoard ? [] : [newLocation]),
    [oppositeColor]:
      indicatorInfo && indicatorInfo.endangers !== null
        ? positions[oppositeColor].filter(
            (playerLocation) =>
              !arrayEqual(indicatorInfo.endangers as Location, playerLocation)
          )
        : positions[oppositeColor],
  }));
};
