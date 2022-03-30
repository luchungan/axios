import Request from "./request";
const request = new Request({
  baseURL: "http://www.tianqiapi.com",
  timeout: 1000 * 60 * 5,
  intercceptors: {
    requestInterceptors: (config) => {
      console.log("实例请求拦截器");
      return config;
    },
    responseInterceptors: (config) => {
      console.log("实例响应拦截器");
      return config;
    },
  },
});
export default request;
