import { INCREMENT, DECREMENT } from './constant'

export const incrementAction = data => ({ type: INCREMENT, data })

export const decrementAction = data => ({ type: DECREMENT, data })

// 异步加
/**
 * 异步action中，返回值为函数，其中一般会调用同步action
 */
export const incrementAsyncAction = (data, delay) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(incrementAction(data))
    }, delay)
  }
}