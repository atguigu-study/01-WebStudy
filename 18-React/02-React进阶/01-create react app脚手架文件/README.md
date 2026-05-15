# 脚手架文件

## 创建项目
``` create-react-app 项目名 ```

## 特殊文件用途
1. reportWebVitals.js：用于检测程序性能
2. setupTests.js：用于测试程序
3. setupProxy.js：用于配置代理

## 配置代理
1. 方法一：在 `package.json` 中增加proxy配置
   - 优点：配置简单，前端请求资源时可以不加任何前缀
   - 缺点：不能配置多个代理
   - 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么请求会转发给5000（优先匹配前端资源）
   ```json
      {
        ......
        "browserslist": {
          ...
        },
        <!-- 配置代理到目标地址 -->
        "proxy": "http://localhost:5000"
      }
    ```
    

2. 方法二：配置代理文件 `src/setupProxy.js`
   - 优点：可以配置多个代理，可以灵活的控制请求是否走代理
   - 缺点：配置繁琐，前端请求资源时，必须加上前缀
    ```js
      const proxy = require('http-proxy-middleware')

      module.exports = function (app) {
        app.use(
          proxy('/api', {
            // 所有带有/api前缀的请求，都会转发到目标地址
            target: 'http://localhost:5000',
            
            // changeOrigin: true时，服务器收到的请求头中的host为localhost:5000
            // changeOrigin: false时，服务器收到的请求头中的host为localhost:3000
            changeOrigin: true, 

            // 去除请求前缀，保证交给后台服务器的时正常请求地址（必须配置）
            pathRewrite: { '^api1/': '' }
          })
        )
      }
    ```