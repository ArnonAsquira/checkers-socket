import {
  IBoardPositions,
  IndicatorInfo,
  IPieceInfoObject,
  ITurn,
} from "../../types/boardTypes";
import { arrayIncludes } from "./arrayEqual";
import { diagonalSquares, oppositeColor } from "./boardUtils";
import { indicatorLocations } from "./boardUtils";

const possibleInteractionPieces = (
  postions: IBoardPositions,
  lastTurn: ITurn
): IPieceInfoObject[] =>
  postions[oppositeColor(lastTurn.color)].filter((info) =>
    arrayIncludes(
      info.location,
      Object.values(diagonalSquares(lastTurn.to.location))
    )
  );

const mandatoryMoves = (
  positions: IBoardPositions,
  lastTurn: ITurn,
  turn: "red" | "blue"
): IndicatorInfo[] | null => {
  const validPieces = possibleInteractionPieces(positions, lastTurn);
  if (validPieces.length < 1) return null;
  const indicators: IndicatorInfo[] = [];
  validPieces.forEach((piece) => {
    const newIndicators = indicatorLocations(
      piece,
      positions,
      turn,
      true
    ).filter((info) => info.endangers);

    console.log(newIndicators);

    indicators.push(...newIndicators);
  });
  console.log(indicators);
  return indicators;
};

export default mandatoryMoves;
