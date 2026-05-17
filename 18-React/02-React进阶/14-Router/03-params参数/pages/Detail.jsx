import React from 'react'
import { use, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const MESSAGES = [
    { id: '1', title: '消息1', content: '内容1' },
    { id: '2', title: '消息2', content: '内容2' },
    { id: '3', title: '消息3', content: '内容3' },
]

export default function Detail(props) {
  console.log('Detail组件接收的props参数是：', props);
  console.log('Detail组件接收的params参数是：', useParams());

  const { id } = useParams()
  const message = MESSAGES.find((messageObj) => {
    return messageObj.id === id
  });
  return (
    <ul>
      <li>ID:{id}</li>
      <li>标题：{message ? message.title : '未找到消息'}</li>
      <li>内容：{message ? message.content : '未找到消息'}</li>
    </ul>
  )
}
