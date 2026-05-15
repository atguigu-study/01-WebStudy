import React, { Component } from 'react'
import Item from '../Item'

export default class List extends Component {
  render() {
    const { user, isFirst, isLoading, error } = this.props
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