import CryptoJS from 'crypto-js';

var {VITE_AI_ID: APPID, VITE_AI_SECRET: API_SECRET, VITE_AI_KEY: API_KEY, VITE_AI_URL: url } = import.meta.env;// import.meta.env参数
const Url = await getWebsocketUrl();
const socket = new WebSocket(Url);

/**
 *  获取websocket连接地址
 * @returns Promise
 */
function getWebsocketUrl() {
  return new Promise((resolve, reject) => {
    var apiKey = API_KEY;
    var apiSecret = API_SECRET;
    var host = location.host;
    var date = new Date().toGMTString();
    var algorithm = 'hmac-sha256';
    var headers = 'host date request-line';
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.1/chat HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(url);
  });
}

/**
 * 发送消息
 * @param socket WebSocket 实例
 * @param message 要发送的消息
 */
const sendMessage = (socket: WebSocket, message: string) => {
  
  if (socket.readyState === WebSocket.OPEN) {
    const params = {
      header: {
        app_id: APPID
      },
      parameter: {
        chat: {
          domain: "generalv3",
          temperature: 0.5,
          max_tokens: 1024
        }
      },
      payload: {
        message: {
          text: [
            {
              role: "user",
              content: message
            }
          ]
        }
      }
    };
    // console.log(params, '请求的参数');
    socket.send(JSON.stringify(params));
  } else {
    console.log('WebSocket is not open, cannot send message.');
  }
};

export { sendMessage, socket };