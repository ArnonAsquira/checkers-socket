import { authAxiosConfig } from "../../constants/axios";
import { socketApiBaseUrl } from "../../constants/socket";
import fetchApi from "../../generalUtils/axios";

const getPlayerStatistics = async () => {
  const statisticsRes = await fetchApi(
    socketApiBaseUrl,
    "statistics",
    "get",
    authAxiosConfig()
  );
  if (statisticsRes.success) {
    return statisticsRes.data;
  }
  console.log(statisticsRes.data);
  //   alert(statisticsRes.data);
};

export default getPlayerStatistics;
