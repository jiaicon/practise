import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Message, Notification } from "@arco-design/web-react";
import { MessageType } from '@arco-design/web-react/es/Message';
import { jumpLogin, downloadFile, getHeaderfromHeaders } from "./utils";
// import vm from "@/main";

let loadingInstance: MessageType | null = null;
let requestNum = 0;

const addLoading = () => {
  // 增加loading 如果pending请求数量等于1，弹出loading, 防止重复弹出
  requestNum++;
  if (requestNum == 1) {
    loadingInstance = Message.loading({
      content: "正在努力加载中....",
    });
  }
};

const cancelLoading = () => {
  // 取消loading 如果pending请求数量等于0，关闭loading
  requestNum--;
  if (requestNum === 0) loadingInstance?.();
};

export const createAxiosByinterceptors = (
  config?: AxiosRequestConfig
): AxiosInstance => {
  const instance = axios.create({
    timeout: 1000,    //超时配置
    withCredentials: true,  //跨域携带cookie
    ...config,   // 自定义配置覆盖基本配置
  });

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config: any) {
      // 在发送请求之前做些什么
      const { loading = true } = config;
      // config.headers.Authorization = vm.$Cookies.get("vue_admin_token");
      if (loading) addLoading();
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      // 对响应数据做点什么
      const { code, data, message } = response.data;
      cancelLoading();
      const filename = getHeaderfromHeaders(response.headers, 'Content-Disposition');
      // config设置responseType为blob 处理文件下载
      if (filename && filename.includes('attachment')) {
        return downloadFile(response);
      } else {
        if (code === 200) {
          return {
            status: true,
            ...data,
          }
        }
        else if (code === 401) {
          jumpLogin();
        } else {
          Notification.error({
            title: code,
            content: message
          });
          return Promise.reject({
            status: false,
            ...data,
          });
        }
      }
    },
    function (error) {
      // 对响应错误做点什么
      const { loading = true } = error.config;
      if (loading) cancelLoading();
      if (error.response) {
        if (error.response.status === 401) {
          jumpLogin();
        }
      }
      Notification.error({
        content: error?.response?.data?.message || "服务端异常"
      });
      return Promise.reject(error);
    }
  );
  return instance;
};
