# React进阶知识学习

将子文件夹中代码复制到根目录的src文件夹内即可运行 `npm run dev`，具体笔记在相关子文件夹

---


## 01-create react app脚手架文件

---


## 02-React路由的基本使用

### 用法
- 明确好页面中的导航区，展示区
- 导航区的 `a` 标签改为 `Link` 标签
  ```jsx
  <Link to="/about">About</Link>
  ```
- 展示区写 `Route` 标签进行路径的匹配，外层用 `<Routes>` 包裹 ~~（ReactRouter6 版本中 `Switch` 已被废弃）~~
  ```jsx
  <Route path="/about" element={<About />} />
  ```
- `<App>` 的最外侧包裹了一个 `<BrowserRouter>` 或者 `<HashRouter>`
- `<Navigate>` 可以实现路由的重定向, ~~(ReactRouter6 版本中已删除)~~
  ```jsx
  <Route path="/" element={<Navigate to="/home" />}></Route>
  ```

### 注意事项
- 如果2个 `Route` 的路径是一样的，那么只会匹配到第一个 `Route`
- 默认使用的是模糊匹配（输入的路径必须包含匹配的路径，切顺序要一致），开启严格匹配用 `exact`，严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由  
- 多级路径刷新页面，导致页面样式丢失的问题：
  1. `public/index.html` 中引入样式时，写 `/` 不写 `./`  
  2. `public/index.html` 中引入脚本时，写 `%PUBLIC_URL%`（仅限react脚手架项目） 不写 `/`
  3. 使用 `<HashRouter>`

---


## 03-NavLink与封装NavLink

### 用法
- `NavLink` 可以实现路由链接的高亮，~~通过 `activeClassName` 指定样式名（ReactRouter6 版本中已删除）~~
- 标签体内容时一个特殊的标签属性 `children`
- 通过 `this.props.children` 可以获取标签体内容
- `{...props}` 可以将封装后的 `MyNavLink` 的属性 `to` 传递给 `<NavLink>`，包括标签体内容 `children`
  ```jsx
  {/* 封装后的NavLink */}
  <MyNavLink to="/test">Test</MyNavLink>

  {/* 通过 ...props 将属性 to 和标签体内容 children 传递给 NavLink */}
  <NavLink activeClassName="active" className="list-group-item" {...this.props}></NavLink>
  ```

---


