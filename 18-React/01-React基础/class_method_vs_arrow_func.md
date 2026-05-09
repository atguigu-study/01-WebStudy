这两种写法看起来很像，但本质差别非常大：

```ts id="1qz90m"
class Car {
  present() {
    console.info(this);
  }
}
```

vs

```ts id="o9yr3m"
class Car {
  present = () => {
    console.info(this);
  }
}
```

核心区别：

# ✅ 第一种：class method（原型方法）

# ✅ 第二种：实例属性 + 箭头函数

---

# 🧠 先看第一种（标准 class method）

```ts id="qg6v5d"
class Car {
  present() {
    console.info(this);
  }
}
```

实际上更接近：

```js id="m7c1wj"
function Car() {}

Car.prototype.present = function () {
  console.info(this);
};
```

---

## 📌 特点

### ✅ 方法在 prototype 上

```js id="1w7yeb"
Car.prototype.present
```

所有实例共享同一个函数：

```js id="y1j4jp"
const a = new Car();
const b = new Car();

a.present === b.present // true
```

👉 更省内存。

---

## ⚠️ `this` 是动态绑定

取决于“怎么调用”。

---

### 正常调用

```js id="x1z1ks"
a.present();
```

👉 `this === a`

---

### 脱离对象调用（经典坑）

```js id="ap71u8"
const fn = a.present;

fn();
```

👉 在 strict mode 下：

```js id="8otvsk"
this === undefined
```

因为调用者没了。

---

# 🧠 第二种（箭头函数写法）

```ts id="2mzv7q"
class Car {
  present = () => {
    console.info(this);
  }
}
```

实际上更像：

```js id="3g9wtt"
class Car {
  constructor() {
    this.present = () => {
      console.info(this);
    };
  }
}
```

---

# 📌 特点

## ✅ 每个实例都有自己的函数

```js id="um4onv"
const a = new Car();
const b = new Car();

a.present === b.present // false
```

👉 因为每次 new 都创建新函数。

---

## ✅ `this` 永远绑定创建时上下文

箭头函数：

# ❌ 没有自己的 this

# ✅ 捕获外层 this（lexical this）

所以：

```js id="40cwjt"
const fn = a.present;

fn();
```

仍然：

```js id="9d5b7o"
this === a
```

不会丢失。

---

# 🚀 React 里为什么以前爱用箭头函数？

因为：

```js id="lfk5lg"
<button onClick={this.handleClick}>
```

普通 method：

```js id="tb2eyr"
handleClick() {
  console.log(this);
}
```

会丢失 this。

所以以前常见：

```js id="75s0yw"
this.handleClick = this.handleClick.bind(this);
```

或者直接：

```js id="pjsq0y"
handleClick = () => {
  console.log(this);
}
```

---

# 📊 总对比

| 特性                    | 普通 method   | 箭头函数属性         |
| --------------------- | ----------- | -------------- |
| 存储位置                  | prototype   | 实例自身           |
| 是否共享函数                | ✅           | ❌              |
| 内存占用                  | 更低          | 更高             |
| this                  | 动态          | 固定             |
| 可被 bind/call/apply 改变 | ✅           | ❌              |
| 适合                    | 普通 class 方法 | callback/event |

---

# ⚠️ 一个高级区别：能否被继承 super 调用

普通 method：

```js id="d9xgfa"
class A {
  hello() {}
}

class B extends A {
  hello() {
    super.hello();
  }
}
```

✅ 可以。

---

箭头函数：

```js id="kt7aqc"
class A {
  hello = () => {}
}
```

👉 不在 prototype 上。

`super.hello()` 会很奇怪/受限。

---

# 🧠 现代建议

## 普通业务 class

优先：

```js id="w1f5q8"
method() {}
```

因为：

* 更标准
* 更省内存
* 更符合 OO

---

## callback 容易丢 this 的地方

可以：

```js id="zjv6ny"
method = () => {}
```

---

# 🚀 一句话总结

```ts id="7bmb8r"
method() {}
```

👉 prototype 方法
👉 this 由调用方式决定

---

```ts id="6pjsy9"
method = () => {}
```

👉 实例属性
👉 this 永远绑定当前实例
