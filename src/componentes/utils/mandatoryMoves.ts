import {
  IBoardPositions,
  IndicatorInfo,
  //   IPieceInfoObject,
  //   ITurn,
} from "../../types/boardTypes";
import { arrayIncludes } from "./arrayEqual";
// import { diagonalSquares, oppositeColor } from "./boardUtils";
import { indicatorLocations } from "./boardUtils";

// const possibleInteractionPieces = (
//   postions: IBoardPositions,
//   lastTurn: ITurn
// ): IPieceInfoObject[] =>
//   postions[oppositeColor(lastTurn.color)].filter((info) =>
//     arrayIncludes(
//       info.location,
//       Object.values(diagonalSquares(lastTurn.to.location))
//     )
//   );

const adjacentPieces = (positions: IBoardPositions, turn: "red" | "blue") => {
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

// const mandatoryMoves = (
//   positions: IBoardPositions,
//   lastTurn: ITurn,
//   turn: "red" | "blue"
// ): IndicatorInfo[] | null => {
//   const validPieces = possibleInteractionPieces(positions, lastTurn);
//   if (validPieces.length < 1) return null;
//   const indicators: IndicatorInfo[] = [];
//   validPieces.forEach((piece) => {
//     const newIndicators = indicatorLocations(
//       piece,
//       positions,
//       turn,
//       true
//     ).filter((info) => info.endangers);

//     console.log(newIndicators);

//     indicators.push(...newIndicators);
//   });
//   //   console.log(indicators);
//   return indicators;
// };

export { adjacentPieces };
// export default mandatoryMoves;
