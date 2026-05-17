# React进阶知识学习

将子文件夹中代码复制到根目录的src文件夹内即可运行 `npm run dev`，具体笔记在相关子文件夹

---


## 01-create react app脚手架文件

---


## 02-React路由的基本使用

### 用法
- 明确好页面中的导航区，展示区
- `<App>` 的最外侧包裹了一个 `<BrowserRouter>` 或者 `<HashRouter>`
  ```jsx
  ReactDOM.createRoot(document.getElementById('root'))
    .render(<React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>)
  ```
- 导航区的 `a` 标签改为 `Link` 标签
  ```jsx
  <Link to="/about">About</Link>
  ```
- 展示区写 `Route` 标签进行路径的匹配，外层用 `<Routes>` 包裹 ~~（ReactRouter6 版本中 `Switch` 已被废弃）~~
  ```jsx
  <Routes>
    <Route path="/about" element={<About />} />
  </Routes>
  ```
- `<Navigate>` 可以实现路由的重定向, ~~(ReactRouter6 版本中已删除)~~
  ```jsx
  <Route path="/" element={<Navigate to="/home" />}></Route>
  ```

### 注意事项
- 如果2个 `Route` 的路径是一样的，那么只会匹配到第一个 `Route`
- 默认使用的是模糊匹配（输入的路径必须包含匹配的路径，且顺序要一致），开启严格匹配用 `exact`，严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由  
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
  <NavLink className="list-group-item" {...this.props}></NavLink>
  ```

---


## 04-嵌套路由

### 用法
- 在路由配置中通过 `children` 字段定义子路由（子路由的 `path` 不以 `/` 开头，子路由路径会自动拼接到父路由后面）。
- 可以使用 `index: true` 指定默认子路由（当访问父路径时显示的默认页面）。
- 父路由组件中使用 `<Outlet />` 指定子路由渲染位置。
- 可在路由配置中使用 `<Navigate>` 做重定向，或在父路由中设置子路由默认项。
- 在 `NavLink` 或 `Link` 中，链接地址应与子路由路径保持一致（例如 `/home/news`）。

示例（路由配置）：
```jsx
const routes = [
  { path: '/', element: <Navigate to="about" /> },
  {
    path: '/home',
    element: <Home />,
    children: [
      { index: true, element: <News /> },
      { path: 'news', element: <News /> },
      { path: 'message', element: <Message /> }
    ]
  },
  { path: '/about', element: <About /> }
]
```

父组件 `Home` 中的占位符示例：
```jsx
function Home() {
  return (
    <div>
      <NavLink className="list-group-item" to="/home/news">News</NavLink> {/* 链接地址应与子路由路径保持一致 */}
      <NavLink className="list-group-item" to="/home/message">Message</NavLink>
      <Outlet /> {/* 子路由渲染在这里 */}
    </div>
  )
}
```

---

## 05-路由参数（params）

### 用法
- params 参数通过 URL 片段传递，路由注册中使用 `:id` 之类的占位符。
- 路由链接写法示例：`to={`detail/${item.id}`}`。
- 在接收组件中用 `useParams()` 获取参数。

路由注册：
```jsx
{
  path: 'message',
  element: <Message />,
  children: [
    { path: 'detail/:id', element: <Detail /> }
  ]
}
```

路由链接
```jsx
<Link to={`detail/${item.id}`}>链接标题</Link>
{/* 指定路由展示的位置 */}
<Outlet />
```

接收参数：
```jsx
import { useParams } from 'react-router-dom'

const { id, title, content } = useParams()
```

### 注意事项
- params 直接写在路径中
- 接收参数时要与路由配置里的变量名一致。如果参数可能不存在，接收组件需要做容错处理。

---

## 06-路由参数（search）

### 用法
- search 参数通过 URL 查询字符串传递，路由注册中只需定义目标路径，不需要 `:key` 占位符。
- 路由注册中只需定义目标路径，不需要 `:key` 占位符。
- 在接收组件中用 `useSearchParams()` 获取参数。

路由注册：
```jsx
{
  path: 'message',
  element: <Message />,
  children: [
    { path: 'detail', element: <Detail /> }
  ]
}
```

路由链接：
```jsx
<Link to={`detail?id=${item.id}&title=${item.title}&content=${item.content}`}>链接标题</Link>
{/* 指定路由展示的位置 */}
<Outlet />
```

接收参数：
```jsx
import { useSearchParams } from 'react-router-dom'

const [search] = useSearchParams()
const id = search.get('id')
const title = search.get('title')
const content = search.get('content')
```

### 注意事项
- search 参数没有类型信息，接收到的都是字符串。
- 查询参数需要使用 `get()` 逐个读取。
- 字符串中出现特殊字符时应该进行编码（例如 `encodeURIComponent`）。

---

## 07-路由参数（state）

### 用法
- state 参数通过 `Link` 或 `navigate()` 的 `state` 属性传递。
- 路由配置与 search 参数类似，只要定义目标路径即可。
- 在接收组件中用 `useLocation()` 读取 `location.state`。

路由链接：
```jsx
<Link to="detail" state={{ id: item.id, title: item.title, content: item.content }}>链接标题</Link>
{/* 指定路由展示的位置 */}
<Outlet />
```

接收参数：
```jsx
import { useLocation } from 'react-router-dom'

const { state: { id, title, content } } = useLocation()
```

### 注意事项
- state 参数不会出现在 URL 中，适合传递临时数据。
- 刷新页面后 `location.state` 可能会丢失，不能当作永久存储。
- state保存在 `window.history.state.usr`

---

## 08-编程式路由导航

### 用法
- 使用 `useNavigate()` 获得导航函数 `navigate`。
- 通过 `navigate('detail', { replace: false, state: { ... } })` 实现动态跳转。
- `navigate()` 也支持数字参数：`navigate(1)` 前进，`navigate(-1)` 后退。

示例：
```jsx
const navigate = useNavigate()
function jumpDetail(item) {
  navigate('detail', {
    replace: false,
    state: {
      id: item.id,
      title: item.title,
      content: item.content
    }
  })
}
```

### 注意事项
- 编程式导航可以在事件处理函数中使用，不依赖 `<Link>`。
- 相对路径会基于当前路由自动拼接。
- `replace: true` 可以替换当前历史记录，避免返回到当前页。




