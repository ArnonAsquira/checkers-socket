import BoardSqaure from "../BoardSquare";
import {
  IndicatorInfo,
  Location,
  IBoardPositions,
  IPieceInfoObject,
  ITurn,
  PlatyerColors,
} from "../../types/boardTypes";
import { useEffect, useState } from "react";
import arrayEqual, { arrayIncludes } from "../utils/arrayEqual";
import {
  initailPlayersLocations,
  amountOfRows,
  quardinatnts,
} from "../utils/boardBuild";
import { indicatorLocations, oppositeColor } from "../utils/boardUtils";
import { adjacentPieces } from "../utils/mandatoryMoves";
import { colorOne, colorTwo } from "../../constants/board";
import { useSelector, useStore } from "react-redux";
import { MainStore } from "../../redux/mainStore";

const OnlineBoard = () => {
  const gamaSlice = useSelector(
    (state: MainStore) => state.onlineCheckersBoard
  );
  // const rows = [];
  // for (let i = 0; i < quardinatnts.length; i += amountOfRows) {
  //   rows.push(
  //     <div>
  //       {quardinatnts.slice(i, i + amountOfRows).map((location) => {
  //         return (
  //           <BoardSqaure
  //             location={location}
  //             color={(location[0] + location[1]) % 2 === 0 ? "light" : "dark"}
  //             player={
  //               arrayIncludes(
  //                 location,
  //                 postions.red.map((info) => info.location)
  //               )
  //                 ? "red"
  //                 : arrayIncludes(
  //                     location,
  //                     postions.blue.map((info) => info.location)
  //                   )
  //                 ? "blue"
  //                 : currentIndicatorLocations
  //                     .map((indicatorLocation) =>
  //                       arrayEqual(indicatorLocation.location, location)
  //                     )
  //                     .includes(true)
  //                 ? "indicator"
  //                 : undefined
  //             }
  //             setSelectedPiece={turnCounter === 0 ? setSelectedPiece : null}
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

  // return <div id="board">{rows.map((row) => row)}</div>;
  return null;
};

export default OnlineBoard;
