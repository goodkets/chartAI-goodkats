// src/utils/websocketManager.ts
import CryptoJS from "crypto-js";

let {
  VITE_AI_ID: APPID,
  VITE_AI_SECRET: API_SECRET,
  VITE_AI_KEY: API_KEY,
  VITE_AI_URL: url,
} = import.meta.env; // import.meta.env参数

let socket: WebSocket | null = null;
let onOpenCallback: (() => void) | null = null;
let onMessageCallback: ((event: MessageEvent) => void) | null = null;
let onCloseCallback: (() => void) | null = null;
let onErrorCallback: ((event: Event) => void) | null = null;

async function getWebsocketUrl() {
  return new Promise((resolve, reject) => {
    let apiKey = API_KEY;
    let apiSecret = API_SECRET;
    var host = location.host;
    var date = new Date().toGMTString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.1/chat HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(url);
  });
}

function createSocket() {
  getWebsocketUrl().then((url) => {
    socket = new WebSocket(url);

    socket.addEventListener("open", () => {
      console.log("WebSocket 连接已打开");
      onOpenCallback?.();
    });

    socket.addEventListener("message", (event) => {
      console.log("WebSocket 收到消息:", event.data);
      onMessageCallback?.(event);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket 连接已关闭");
      onCloseCallback?.();
      // 重连机制
      // setTimeout(createSocket, 5000); // 5秒后重连
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket 发生错误:", event);
      onErrorCallback?.(event);
      // 重连机制
      // setTimeout(createSocket, 5000); // 5秒后重连
    });
  });
}

function sendMessage(message: string) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const params = {
      header: {
        app_id: APPID,
      },
      parameter: {
        chat: {
          domain: "generalv3",
          temperature: 0.5,
          max_tokens: 1024,
        },
      },
      payload: {
        message: {
          text: [
            {
              role: "user",
              content: message,
            },
          ],
        },
      },
    };

    try {
      socket.send(JSON.stringify(params));
      console.log("消息发送成功");
    } catch (error) {
      console.error("消息发送失败:", error);
    }
  } else {
    console.log("WebSocket is not open, cannot send message.");
  }
}

function setOnOpenCallback(callback: () => void) {
  onOpenCallback = callback;
}

function setOnMessageCallback(callback: (event: MessageEvent) => void) {
  onMessageCallback = callback;
}

function setOnCloseCallback(callback: () => void) {
  onCloseCallback = callback;
}

function setOnErrorCallback(callback: (event: Event) => void) {
  onErrorCallback = callback;
}

// 初始化 WebSocket 连接
createSocket();

export {
  sendMessage,
  setOnOpenCallback,
  setOnMessageCallback,
  setOnCloseCallback,
  setOnErrorCallback,
};
