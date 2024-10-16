export default async function fetchToken(): Promise<string | null> {
    const url = 'https://callapi.xfyun.cn/v1/service/v1/aicall/oauth/v1/token';
    const app_secret = 'ZmJjMzQzN2ZiYTI1NWYwYzM5OWJhOTgz'
    const app_key = '152bb29fc144b62e55d7cc1f54795eee'
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'no-cache',
    };
  
    const body = {
      app_key,
      app_secret
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      return data.access_token; // 假设返回的数据中包含 access_token 字段
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  }