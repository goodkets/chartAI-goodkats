import React, { useEffect, useState } from 'react'
import WithSkeleton from "@/components/skeleton"
import { Props } from "./type"
// import UserLogo from '@/components/userLogo'
import "./module.scss"
import TextMessage from '@/components/textMessage'

const Chat: React.FC<Props> = (props) => {
  const { text } = props
  console.log(text, '聊天')
  // const texts = [{ text: '你好', message: "robot" }, { text: '你好啊', message: "user" }, { text: '你有什么问题呢！', message: "robot" }, { text: '哈哈哈', message: "user" }]
  const texts = []
  if (text.text) {
    texts.push(text)
  }
  return (
    <>
      <div className='containerChat'>
        {/* <TextMessage message='robot' /> */}
        {texts.map((item, index) => (
          // console.log(item, 'item'),
          <TextMessage message={item.message} key={index} text={item.text} />
        ))}
    </div>
    </>
  )
}

export default  WithSkeleton(Chat)