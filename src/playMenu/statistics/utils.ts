import { authAxiosConfig } from "../../constants/axios";
import { socketApiBaseUrl } from "../../constants/socket";
import fetchApi from "../../generalUtils/axios";
import { IPlayersStats, IScoreData } from "../../types/socketTypes";

const getPlayerStatistics = async (): Promise<
  undefined | IPlayersStats | string
> => {
  const statisticsRes = await fetchApi<IPlayersStats | string>(
    socketApiBaseUrl,
    "statistics",
    "get",
    authAxiosConfig()
  );
  if (statisticsRes.success) {
    return statisticsRes.data;
  }
  console.log({ statsErr: statisticsRes.data });
};

const createScoreList = (
  scores: IPlayersStats
): (IScoreData & { win: boolean })[] => {
  const parsedWins = scores.checkersData.wins.map((score) => ({
    ...score,
    win: true,
  }));
  const parsedLoses = scores.checkersData.loses.map((score) => ({
    ...score,
    win: false,
  }));

  return parsedWins
    .concat(parsedLoses)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export { createScoreList };
export default getPlayerStatistics;
