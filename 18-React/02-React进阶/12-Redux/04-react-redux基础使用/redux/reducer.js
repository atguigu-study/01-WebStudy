/**
 * 该文件用于创建一个为Count组件服务的reducer，reducer本质是一个函数
 * 
 * reducer函数接收两个参数：之前的状态(preState)、动作对象(action)
 *                        第一次被调用时，preState为undefined
 */

import { INCREMENT, DECREMENT } from './constant'

const initState = 0
export default function countReducer(preState = initState, action) {
  const { type, data } = action

  switch (type) {
    case INCREMENT:
      return preState + data
    case DECREMENT:
      return preState - data
    default:
      return preState
  }
}
