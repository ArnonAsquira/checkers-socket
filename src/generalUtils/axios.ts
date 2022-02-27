import axios from "axios";
import {
  IAXiosConfig,
  IAxiosResponse,
  RequestMethod,
} from "../types/axiosTypes";

const makeAxiosRes = <T>(success: boolean, data: T): IAxiosResponse<T> => ({
  success,
  data,
});

const parseErr = (err: any) => {
  return err && err.response && err.response.data;
};

const fetchApi = async <T>(
  url: string,
  path: string,
  method: RequestMethod,
  config?: IAXiosConfig,
  payload?: any
): Promise<IAxiosResponse<T>> => {
  try {
    const { data } =
      method === "get"
        ? await axios.get(`${url}/${path}`, config)
        : await axios[method](`${url}/${path}`, payload, config);
    return makeAxiosRes(true, data);
  } catch (err) {
    const data = parseErr(err);
    return makeAxiosRes(false, data);
  }
};

export default fetchApi;
