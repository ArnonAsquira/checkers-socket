type RequestMethod = "get" | "post" | "delete" | "put";

interface IAxiosResponse<T> {
  success: boolean;
  data: T;
}

interface IAXiosConfig {
  headers: {};
}

export type { RequestMethod, IAxiosResponse, IAXiosConfig };
