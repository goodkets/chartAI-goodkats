// src/utils/websocketManager.ts
import CryptoJS from "crypto-js";

const {
  VITE_AI_ID: APPID,
  VITE_AI_SECRET: API_SECRET,
  VITE_AI_KEY: API_KEY,
  VITE_AI_URL: url,
} = import.meta.env; // import.meta.env参数

let socket: WebSocket | null = null;
let onOpenCallback: (() => void) | null = null;
let onMessageCallback:
  | ((message: { message: string; avator: string; status?: number }) => void)
  | null = null;
let onCloseCallback: ((message: string) => void) | null = null;
let messages: { message: string; avator: string }[] = [];
let limitConnect = 2;
let timeConnect = 0;

async function getWebsocketUrl() {
  return new Promise((resolve, reject) => {
    var host = `baidu.com/data=${new Date().getTime()}`;
    var date = new Date().toUTCString();
    let apiKey = API_KEY;
    let apiSecret = API_SECRET;
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signature = `host: ${host}\ndate: ${date}\nGET /v3.1/chat HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signature, apiSecret);
    var signatureBase64 = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signatureBase64}"`;
    var authorization = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(authorizationOrigin)
    );
    var websocketUrl = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(websocketUrl);
  });
}

async function createSocket(websocketUrl: any) {
  try {
    socket = new WebSocket(websocketUrl);
    messages = []; // 对话初始化
    socket.addEventListener("open", () => {
      limitConnect = 2; // 连接成功过后重置重连次数
      console.log("WebSocket 连接已打开");
      onOpenCallback?.();
    });

    socket.addEventListener("message", (event) => {
      const { payload } = JSON.parse(event.data);
      // console.log("payload:", event);
      const messageContent =
        payload.choices.text[0].content ||
        JSON.parse(event.data).header.message;
      messages.push({ message: messageContent, avator: "robot" });
      onMessageCallback?.({
        message: messageContent,
        avator: "robot",
        status: payload.choices.status,
      });
    });

    socket.addEventListener("close", async () => {
      console.log("WebSocket 连接已关闭");
      // 重连机制
      reconnect();
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket 发生错误:", event);
      onMessageCallback?.({
        message: "连接断开，请刷新重试",
        avator: "robot",
        status: 404,
      });
      // 重连机制
      reconnect();
    });
  } catch (e) {
    console.error("WebSocket 创建失败:", e);
    onMessageCallback?.({
      message: "连接创建失败，请检查网络设置",
      avator: "robot",
      status: 500,
    });
  }
}

async function reconnect() {
  if (limitConnect > 0) {
    limitConnect--;
    timeConnect++;
    console.log("第" + timeConnect + "次重连");
    // 进行重连
    setTimeout(function () {
      SocketGET();
    }, 1000);
  } else {
    console.log("重连次数已达到上限，连接已超时");
    onMessageCallback?.({
      message: "重连次数已达到上限，连接已超时",
      avator: "robot",
      status: 500,
    });
  }
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
      onCloseCallback?.("success");
    } catch (error) {
      console.error("消息发送失败:", error);
      onMessageCallback?.({
        message: "消息发送失败，请检查网络设置",
        avator: "robot",
        status: 500,
      });
    }
  } else {
    console.log("WebSocket is not open, cannot send message.");
    onMessageCallback?.({
      message: "WebSocket 未连接，无法发送消息",
      avator: "robot",
      status: 500,
    });
  }
}

function setOnOpenCallback(callback: () => void) {
  onOpenCallback = callback;
}

function setOnMessageCallback(
  callback: (message: {
    message: string;
    avator: string;
    status?: string;
  }) => void
) {
  onMessageCallback = callback;
}

function setOnCloseCallback(callback: (message: string) => void) {
  onCloseCallback = callback;
}

function setOnErrorCallback(callback: (event: Event) => void) {
  onErrorCallback = callback;
}

async function SocketGET() {
  try {
    const websocketUrl = await getWebsocketUrl();
    createSocket(websocketUrl);
  } catch (e) {
    console.error("获取 WebSocket URL 失败:", e);
    onMessageCallback?.({
      message: "获取 WebSocket URL 失败，请检查网络设置",
      avator: "robot",
      status: 500,
    });
  }
}

// 初始化 WebSocket 连接
(async () => {
  await SocketGET();
})();

export {
  sendMessage,
  setOnOpenCallback,
  setOnMessageCallback,
  setOnCloseCallback,
  setOnErrorCallback,
  createSocket,
  getWebsocketUrl,
};
