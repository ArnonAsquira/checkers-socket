import BoardSqaure from "./BoardSquare";
import {
  IndicatorInfo,
  Location,
  IBoardPositions,
  IPieceInfoObject,
  ITurn,
  PlatyerColors,
} from "../types/boardTypes";
import { useEffect, useState } from "react";
import arrayEqual, { arrayIncludes } from "./utils/arrayEqual";
import {
  initailPlayersLocations,
  amountOfRows,
  quardinatnts,
} from "./utils/boardBuild";
import { indicatorLocations, oppositeColor } from "./utils/boardUtils";
import { adjacentPieces } from "./utils/mandatoryMoves";
import { useNavigate } from "react-router-dom";
import { ILocalGameObj, InitialGameObject } from "./utils/gameObject";
import { determinePieceViaLocation, takeTurn } from "./utils/gameUtils";

const Board = () => {
  const [gameObj, updateGameObj] = useState<ILocalGameObj>(InitialGameObject);
  const navigate = useNavigate();

  const { mandatoryMoves, selectedPiece, positions, turnCounter, currentTurn } =
    gameObj;

  const currentIndicatorLocations =
    mandatoryMoves.length > 0
      ? mandatoryMoves
      : indicatorLocations(
          selectedPiece,
          positions,
          currentTurn,
          turnCounter === 0
        );

  useEffect(() => {
    if (mandatoryMoves.length > 0) return;
    const newMandatoryMoves = adjacentPieces(positions, currentTurn);
    if (newMandatoryMoves !== null) {
      updateGameObj((gameObj) => ({
        ...gameObj,
        mandatoryMoves: newMandatoryMoves,
      }));
    }
  }, [gameObj.currentTurn]);

  // const rows = [];
  // for (let i = 0; i < quardinatnts.length; i += amountOfRows) {
  //   rows.push(
  //     <div style={{ minHeight: "50px" }}>
  //       {quardinatnts.slice(i, i + amountOfRows).map((location) => {
  //         return (
  //           <BoardSqaure
  //             location={location}
  //             color={(location[0] + location[1]) % 2 === 0 ? "light" : "dark"}
  //             player={determinePieceViaLocation(
  //               location,
  //               gameObj.positions,
  //               gameObj.indicators
  //             )}
  //             setSelectedPiece={
  //               turnCounter === 0
  //                 ? (piece: IPieceInfoObject) => {
  //                     gameObj.selectedPiece = piece;
  //                   }
  //                 : null
  //             }
  //             isSelectedPiece={
  //               selectedPiece === null
  //                 ? false
  //                 : arrayEqual(selectedPiece.location, location)
  //             }
  //             takeTurn={takeTurn}
  //             isQueen={
  //               arrayIncludes(
  //                 location,
  //                 postions.red
  //                   .filter((info) => info.isQueen)
  //                   .map((info) => info.location)
  //               ) ||
  //               arrayIncludes(
  //                 location,
  //                 postions.blue
  //                   .filter((info) => info.isQueen)
  //                   .map((info) => info.location)
  //               )
  //             }
  //           />
  //         );
  //       })}
  //     </div>
  //   );
  // }

  // return (
  //   <div id="board">
  //     <div className="log-out-of-game">
  //       <button onClick={() => navigate("/gameOptions")}>quit game</button>
  //     </div>
  //     {rows.map((row) => row)}
  //   </div>
  // );

  return null;
};

export default Board;
