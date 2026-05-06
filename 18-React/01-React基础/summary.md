# 01-React基础 01、02 课总结

## 01-HelloReact

### 重点
- 介绍 React 的最基本使用：创建虚拟 DOM 并将其渲染到页面中。
- 核心库：`react.development.js`
- DOM 操作库：`react-dom.development.js`
- JSX 解析：`babel.min.js`

### 用法
- 在 HTML 中引入 `react`、`react-dom`、`babel`。
- 在 `<script type="text/babel">` 里编写 JSX。
- 使用 `ReactDOM.render(vDOM, DOM节点)` 将虚拟 DOM 渲染到页面。


### 注意事项
- JSX 只能在 `type="text/babel"` 的脚本中直接使用，babel会把jsx转换成js。
- 渲染目标节点需要先存在，例如 `document.getElementById('test')`。
- 虚拟DOM比较轻，真实DOM比较重，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性
- 虚拟DOM最终会被React渲染成真实DOM，只有真实DOM才能被浏览器识别

---

## 02-JSX基本使用

### 重点
- 讲解创建虚拟 DOM 的两种方式：`React.createElement()` 和 JSX。
- 演示 JSX 中如何使用变量、属性、文本、嵌套标签。
- 说明 JSX 与 React.createElement 的等价关系。

### 用法
- 原生创建方式：
  - `React.createElement('h2', { id: myID }, React.createElement('span', {}, myData))`
- JSX 创建方式：
  - `<h2 id={myID.toUpperCase()}><span className="red">{myData.toUpperCase()}</span></h2>`
- JSX 中使用变量：`{myID}`、`{myData}`。
- JSX 中写 class 属性时使用 `className`。
- 在 JSX 中使用数组渲染列表：`arr.map((item, index) => <li key={index}>{item}</li>)`。

```jsx
// JSX 创建
const vDOM = (
    <h2>
        hello, react
    </h2>
)
ReactDOM.render(vDOM, document.getElementById('test'))
```
```js
// 原生创建
const vDOM = React.createElement('h2', {}, 'hello, react')
ReactDOM.render(vDOM, document.getElementById('test'))
```

### 注意事项
- JSX 需要通过 Babel 转换成 `React.createElement` 调用。
- JSX 标签属性值可以是 JS 表达式，写在 `{}` 中。只能写 JS 表达式，不能写 JS 语句。
- 标签属性 `class` 需改为 `className`，否则会报错。
- 内联样式写法：`style={{ color: 'red' }}`
- 虚拟DOM只能有一个根节点，不支持多个根节点，可以使用 `<div>`或者 `<></>` 包裹多个根节点。
- 标签要闭合，否则报错：`Uncaught SyntaxError: Inline Babel script: Unterminated JSX contents`
- 标签首字母：
  - 如果小写，会被解析成 HTML 标签（如果不存在，报错为`The tag <good> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.`）
  - 如果大写，会被解析成自定义标签（如果未定义，报错为`Uncaught ReferenceError: Good is not defined`）。
- 列表渲染时需要 `key` 属性；示例中使用 `index` 作为 key，但这只是临时方案，实际项目中应避免用索引作为 `key`，而是使用对象的 `id` 或其他唯一标识符。如果使用 `index` 作为 `key`，当数组中的元素顺序发生变化时，React无法正确识别哪些元素发生了变化，从而导致性能问题和意外的行为。


---

## 综合提醒
- 本阶段重点是理解 React 的虚拟 DOM、JSX 语法和渲染流程。 
- 先掌握 `ReactDOM.render()`、`React.createElement()`、JSX 基本写法，再继续学习组件与状态管理。
