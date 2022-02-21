import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MainStore } from "../../redux/mainStore";
import getPlayerStatistics from "./utils";

const MainScreen = () => {
  const [stats, setStats] = useState<any>(null);

  const socketSlice = useSelector((state: MainStore) => state.socket);

  useEffect(() => {
    const setStatsFromServer = async () => {
      const newStats = await getPlayerStatistics();
      setStats(newStats);
    };
    setStatsFromServer();
  }, [socketSlice.userId]);

  console.log(stats);

  return null;
};

export default MainScreen;
