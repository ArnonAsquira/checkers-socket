import {
  IBoardPositions,
  IndicatorInfo,
  PlatyerColors,
} from "../../types/boardTypes";
import { arrayIncludes } from "./arrayEqual";
import { indicatorLocations } from "./boardUtils";

const adjacentPieces = (positions: IBoardPositions, turn: PlatyerColors) => {
  const allIndicators: IndicatorInfo[] = [];
  positions[turn].forEach((info) => {
    allIndicators.push(...indicatorLocations(info, positions, turn, true));
  });
  const uniqueIndicators: IndicatorInfo[] = allIndicators.filter(
    (info) => info.endangers
  );
  for (let i = 0; i < allIndicators.length; i++) {
    if (
      !arrayIncludes(
        allIndicators[i].location,
        uniqueIndicators.map((info) => info.location)
      )
    ) {
      uniqueIndicators.push(allIndicators[i]);
    }
  }
  console.log(uniqueIndicators);
  return uniqueIndicators.filter((info) => info.endangers);
};

export { adjacentPieces };
