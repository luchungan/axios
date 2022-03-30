import request from "./index";
import type { RequestConfig } from "./type";
interface MyRequestConfig<T> extends RequestConfig {
  data?: T;
}
interface MyResponse<T> {
  code: number;
  message: string;
  data: T;
}
interface Req {
  version: string;
  appid: number;
  appsecret: string;
}
interface Res {
  cityid: string;
  city: string;
  cityEn: string;
  country: string;
  countryEn: string;
  update_time: string;
  data: any[];
}
const myRequest1 = <D, T = any>(config: MyRequestConfig<D>) => {
  const { method = "GET" } = config;
  if (method == "get" || method == "GET") {
    config.params = config.data;
  }
  return request.request<MyResponse<T>>(config);
};

const get15DaysWeatherByArea = (data: Req) => {
  return myRequest1<Req, Res>({
    url: "/api",
    method: "GET",
    data,
    intercceptors: {
      requestInterceptors(res) {
        console.log("接口请求拦截");
        return res;
      },
      responseInterceptors(result) {
        console.log("接口响应拦截");
        return result;
      },
    },
  });
};

export { get15DaysWeatherByArea };
