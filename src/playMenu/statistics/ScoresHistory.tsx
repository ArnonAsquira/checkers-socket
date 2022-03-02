import { FC } from "react";
import { IPlayersStats } from "../../types/socketTypes";
import { createScoreList } from "./utils";

interface IScoresHistoryProps {
  stats: IPlayersStats;
}

const ScoresHistory: FC<IScoresHistoryProps> = ({ stats }) => {
  const scoresList = createScoreList(stats);
  return (
    <div className="scores-history">
      <h2>games played: {scoresList.length}</h2>
      {scoresList.map((score) => (
        <div
          className="single-score"
          style={{
            color: score.win ? "green" : "red",
            borderBottom: "1px solid black",
          }}
        >
          <span style={{ fontWeight: 600 }}>{score.win ? "won" : "lost"}</span>{" "}
          against <span style={{ fontWeight: 600 }}>{score.id.userName} </span>
          {/* at {score.date.slice(3, 19)} */}
        </div>
      ))}
    </div>
  );
};

export default ScoresHistory;
