import React from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Test from './pages/Test'
import MyNavLink from './components/MyNavLink'

export default function App() {
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header">
            <h2>React Router Demo</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* 路由链接 */}
            <NavLink activeClassName="active" className="list-group-item" to="/about">About</NavLink>
            <NavLink activeClassName="active" className="list-group-item" to="/home">Home</NavLink>
            <MyNavLink to="/test">Test</MyNavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* 注册路由 */}
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/home" element={<Home />} />
                <Route path="/test" element={<Test />} />
                <Route path="/" element={<Navigate to="/about" />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
