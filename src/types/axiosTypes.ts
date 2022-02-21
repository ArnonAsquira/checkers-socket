type RequestMethod = "get" | "post" | "delete" | "put";

interface IAxiosResponse {
  success: boolean;
  data: any;
}

interface IAXiosConfig {
  headers: {};
}

export type { RequestMethod, IAxiosResponse, IAXiosConfig };
