import { Location, IPieceInfoObject } from "../types/boardTypes";
import { useEffect, useState } from "react";
import arrayEqual from "./utils/arrayEqual";
import { amountOfRows, quardinatnts } from "./utils/boardBuild";
import { adjacentPieces } from "./utils/mandatoryMoves";
import { useNavigate } from "react-router-dom";
import { ILocalGameObj, InitialGameObject } from "./utils/gameObject";
import { selectPiece, takeTurn } from "./utils/gameUtils";
import { createCheckersBoard } from "./utils/boardUtils";

const Board = () => {
  const [gameObj, updateGameObj] = useState<ILocalGameObj>(InitialGameObject);
  const navigate = useNavigate();

  const { mandatoryMoves, selectedPiece, positions, currentTurn } = gameObj;

  gameObj.indicators =
    mandatoryMoves.length > 0 && !selectedPiece
      ? mandatoryMoves
      : gameObj.indicators;

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

  const handleSelectPiece = (piece: IPieceInfoObject) => {
    updateGameObj({ ...selectPiece(piece, gameObj) });
  };

  const handleTakeTurn = (indicatorLocation: Location) => {
    const indicator = gameObj.indicators.find((indicatorInfo) =>
      arrayEqual(indicatorInfo.location, indicatorLocation)
    );
    if (!indicator) {
      return;
    }
    updateGameObj(() => ({ ...takeTurn(gameObj, indicator) }));
  };

  const rows = createCheckersBoard(
    quardinatnts,
    amountOfRows,
    gameObj,
    handleSelectPiece,
    handleTakeTurn
  );

  return (
    <div id="board">
      <div className="log-out-of-game">
        <button onClick={() => navigate("/gameOptions")}>quit game</button>
      </div>
      {rows.map((row) => row)}
    </div>
  );
};

export default Board;
