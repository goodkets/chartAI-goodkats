import axios from "axios";

// 请求 URL
const authUrl = "https://callapi.xfyun.cn/v1/";
const apiUrl = "https://api.xf-yun.com/v1/private/sf8e6aca";

/**
 * 获取鉴权token--拦截器
 */
const serviceAccessToken = axios.create({
  // 使用环境变量 VITE_AI_URL
  baseURL:    authUrl,
  timeout: 10000,
});

serviceAccessToken.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Charset'] = 'UTF-8';
    config.headers['Cache-Control'] = 'no-cache';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

serviceAccessToken.interceptors.response.use(
  (res) => {
    console.log(res);
    return res.data;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export { serviceAccessToken };