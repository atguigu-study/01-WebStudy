import React from 'react'
import Count from './containers/Count'
import store from './redux/store'

export default function App() {
  return (
    <Count store={store} />
  )
}
