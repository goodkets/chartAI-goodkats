import React, { useEffect, useState } from 'react'
import WithSkeleton from "@/components/skeleton"
import { Props } from "./type"
// import UserLogo from '@/components/userLogo'
import "./module.scss"
import TextMessage from '@/components/textMessage'
import { socket } from '@/utils/TTSRecorder';

const Chat: React.FC<Props> = (props) => {
  const { text } = props
  console.log(text, '聊天')
  // const [texts, setTexts] = useState([{ avator: "user", message: "asd" }, { text: '你好', message: "robot" }, { text: '你好啊', message: "user" }, { text: '你有什么问题呢！', message: "robot" }, { text: '哈哈哈', message: "user" }, { text: '你好', message: "robot" }, { text: '你好啊', message: "user" }, { text: '你有什么问题呢！', message: "robot" }, { text: '哈哈哈', message: "user" }, { text: '你好', message: "robot" }, { text: '你好啊', message: "user" }, { text: '你有什么问题呢！', message: "robot" }, { text: '哈哈哈', message: "user" }])
  const [texts, setTexts] = useState([])
  const [content, setContent] = useState([])
  useEffect(() => {
    if (text.avator == 'user' && text.message) {
      console.log('user')
      setTexts([...texts, text])
    }
  }, [text])
  socket.addEventListener('open', () => {
    console.log('WebSocket 连接已打开');
  });
  socket.addEventListener('message', (event) => {
    // console.log('WebSocket 收到消息:', event.data);
    const { payload } = JSON.parse(event.data)
    console.log(event.data, 11111)
    // setTexts([...texts, { avator: 'robot', message: payload.choices.text[0].content }])
    setContent([...content, { message: payload.choices.text[0].content, avator: 'robot' }])
    return event.data;
    // 在这里处理接收到的消息
  });
  socket.addEventListener('close', () => {
    const message = content.map(item => item.message).join('')
    console.log(message, 'message')
    setTexts([...texts, { avator: 'robot', message: message }])
    console.log('WebSocket 连接已关闭');
  });
  socket.addEventListener('error', (event) => {
    console.error('WebSocket 发生错误:', event);
  });
  // const texts = [{ text: '你好', message: "robot" }, { text: '你好啊', message: "user" }, { text: '你有什么问题呢！', message: "robot" }, { text: '哈哈哈', message: "user" }]

  // if (text.avator == 'user') {
  // console.log('user')
  // setTexts(['789'])
  // }
  console.log(texts, 'texts')
  return (
    <>
      <div className='containerChat' style={{ height: '200px' }}>
        {/* <TextMessage message='robot' /> */}
        {texts.map((item, index) => (
          // console.log(item, 'item'),
          <TextMessage avator={item.avator} key={index} message={item.message} />
        ))}
    </div>
    </>
  )
}

export default  WithSkeleton(Chat)