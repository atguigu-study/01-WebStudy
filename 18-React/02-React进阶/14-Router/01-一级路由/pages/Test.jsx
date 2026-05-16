import React from 'react'

export default function Test(props) {
  return (
    console.log('Test组件更新了', props),
    <h3>这是Test的内容</h3>
  )
}
