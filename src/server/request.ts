import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { RequestConfig, RequestInterceptors } from "./type";
class Request {
  // axios实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors;
  // 存放取消方法合集
  cancleRequestSourceList?: Map<string, () => void>;
  // 存放所有请求url集合
  requestUrlList?: Set<String>;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.intercceptors;

    this.requestUrlList = new Set();
    this.cancleRequestSourceList = new Map([]);

    // 类拦截器
    this.instance.interceptors.request.use((res: AxiosRequestConfig) => {
      console.log("全局请求拦截器");
      return res;
    });

    //使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      (res: AxiosRequestConfig) => {
        console.log("全局响应拦截器");
        return res.data;
      },
      (err: any) => err
    );
  }
  //request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求拦截器
      if (config.intercceptors?.requestInterceptors) {
        config = config.intercceptors.requestInterceptors(config);
      }
      // 取消当前请求
      const url = config.url;
      // 重复请求取消前一个
      if (url && this.cancleRequestSourceList?.get(url)) {
        let c = this.cancleRequestSourceList?.get(url);
        c && c();
      }
      if (url) {
        this.requestUrlList?.add(url);
        config.cancelToken = new axios.CancelToken((c) => {
          this.cancleRequestSourceList?.set(url, c);
        });
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.intercceptors?.responseInterceptors) {
            res = config.intercceptors.responseInterceptors<T>(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        })
        .finally(() => {
          url && this.delUrl(url);
        });
    });
  }
  delUrl(url: string) {
    this.requestUrlList?.delete(url);
    this.cancleRequestSourceList?.delete(url);
  }
  // 取消全部请求
  cancleAllRequest() {
    this.cancleRequestSourceList?.forEach((source, url) => {
      source();
      this.delUrl(url);
    });
  }
  // 取消单个请求
  cancleRequest(url: string | string[]) {
    if (typeof url === "string") {
      let c = this.cancleRequestSourceList?.get(url);
      c && c();
      this.delUrl(url);
    } else {
      (url as string[]).forEach((u: string) => {
        let c = this.cancleRequestSourceList?.get(u);
        c && c();
        this.delUrl(u);
      });
    }
  }
}

export default Request;
