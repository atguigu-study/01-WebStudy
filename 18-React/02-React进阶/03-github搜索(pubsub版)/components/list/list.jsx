import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import Item from '../item/item'

export default class List extends Component {
  state = {
    user: [],
    isFirst: true,
    isLoading: false,
    error: ''
  }

  componentDidMount() {
    this.token = PubSub.subscribe('updateState', (_, data) => {
      this.setState(data)
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }

  render() {
    const { user, isFirst, isLoading, error } = this.state
    return <div className="row">
      {
        isFirst ? <h2>请输入关键词以搜索用户</h2> :
          isLoading ? <h2>Loading...</h2> :
            error ? <h2>{error}</h2> :
              user.map((item) => {
                return <Item key={item.login} {...item} />
              })
      }
    </div>
  }
}