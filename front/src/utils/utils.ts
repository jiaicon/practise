import { Message } from "@arco-design/web-react";
import { AxiosResponse, AxiosResponseHeaders } from "axios";
import { } from 'react-router-dom';

/**
 *   跳转登录
 */
export const jumpLogin = () => {
  // vm.$Cookies.remove("vue_admin_token");
  // vm.$router.push(`/login?redirect=${encodeURIComponent(vm.$route.fullPath)}`);
};

function downloadStream(response: AxiosResponse) {
  return new Promise((resolve, reject) => {
    try {
      const blob = new Blob([response.data]);
      // 本地保存文件
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const filename = getHeaderfromHeaders(response.headers, 'Content-Disposition')
        ?.split("filename=")?.[1] || 'text.text';
      link.setAttribute("download", decodeURI(filename));
      document.body.appendChild(link);
      link.click();
      resolve(true);
    } catch (err) {
      reject(err);
    }
  })
}

/**
 * 下载文件
 * @param response
 * @returns
 */
export const downloadFile = (response: AxiosResponse) => {
  console.log("response.data.type:", response.data.type);
  return new Promise(async (resolve, reject) => {
    if (response.data?.type !== 'blob') {
      try {
        const res = await downloadStream(response);
        if (res) {
          await resolve(response.data);
        } else {
          await reject('下载文件时发生错误，请检查您的浏览器');
        }
      } catch (e) {
        reject(e);
      }
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async function () {
      try {
        console.log("result:", this.result);
        const jsonData = JSON.parse((this as any).result); // 成功 说明是普通对象数据
        if (jsonData?.code !== 200) {
          Message.error(jsonData?.message ?? "请求失败");
          reject(jsonData);
        }
      } catch (err) {
        // 解析成对象失败，说明是正常的文件流
        try {
          await downloadStream(response);
          await resolve(response.data);
        } catch (e) {
          reject(e);
        }
      }
    };
    fileReader.readAsText(response.data);
  });
};
/**
 * @author Icon
 * @description: // 获取headers中的header
 * @date 2022-06-28 10:02
 */
export const getHeaderfromHeaders = (headers: AxiosResponseHeaders, header: string): string | null => {
  const keys = Object.keys(headers);
  let value = 'null';
  keys.find(item => {
    if (item.toLowerCase() === header.toLowerCase()) {
      value = headers[item];
    }
  })
  return value;
}
