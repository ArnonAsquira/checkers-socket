import { ChartData } from "chart.js";

import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MainStore } from "../../redux/mainStore";
import { IPlayersStats } from "../../types/socketTypes";
import DougnutGraph from "./DougnutGraph";
import ScoresHistory from "./ScoresHistory";
import getPlayerStatistics from "./utils";

const MainScreen = () => {
  const [stats, setStats] = useState<IPlayersStats | null>(null);
  const [statsForGraph, setStatsForGraph] = useState<ChartData<
    "doughnut",
    number[],
    unknown
  > | null>(null);

  const socketSlice = useSelector((state: MainStore) => state.socket);

  useEffect(() => {
    const setStatsFromServer = async () => {
      const newStats = await getPlayerStatistics();
      if (newStats && typeof newStats !== "string") {
        setStats(newStats as IPlayersStats);
      }
    };
    setStatsFromServer();
  }, [socketSlice.userId, socketSlice.gameToken]);

  useEffect(() => {
    if (!stats) {
      return;
    }
    const wins = stats.checkersData.wins;
    const loses = stats.checkersData.loses;

    const graphData: ChartData<"doughnut", number[], unknown> = {
      labels: ["wins", "loses"],
      datasets: [
        {
          data: [wins.length, loses.length],
          backgroundColor: ["red", "blue"],
        },
      ],
    };
    setStatsForGraph(graphData);
  }, [stats]);

  return (
    <Fragment>
      {statsForGraph === null || !statsForGraph ? null : (
        <DougnutGraph data={statsForGraph} />
      )}
      {stats ? <ScoresHistory stats={stats} /> : null}
    </Fragment>
  );
};

export default MainScreen;
