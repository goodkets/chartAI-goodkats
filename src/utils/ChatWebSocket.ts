// WebSocket 客户端
class ChatWebSocket {
    private ws: WebSocket | null = null;
    private url: string;
  
    constructor(url: string) {
      this.url = url;
    }
  
    public connect() {
      this.ws = new WebSocket(this.url);
  
      // 监听连接打开事件
      this.ws.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event);
        // 在这里可以发送初始化消息
        this.send({ type: 'init' });
      });
  
      // 监听消息事件
      this.ws.addEventListener('message', (event) => {
        console.log('Received message:', event.data);
        // 处理接收到的消息
        this.handleMessage(event.data);
      });
  
      // 监听关闭事件
      this.ws.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
        // 重新连接
        setTimeout(() => this.connect(), 5000); // 5秒后重连
      });
  
      // 监听错误事件
      this.ws.addEventListener('error', (event) => {
        console.error('WebSocket error:', event);
        // 重新连接
        setTimeout(() => this.connect(), 5000); // 5秒后重连
      });
    }
  
    private send(message: any) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message));
      } else {
        console.error('WebSocket not open yet');
      }
    }
  
    private handleMessage(data: string) {
      const parsedData = JSON.parse(data);
      console.log('Parsed message:', parsedData);
      // 根据接收到的数据进行处理
    }
  }
  
  
  export default ChatWebSocket;