### 涉及方向

主要从
- Route
- Table
- Form
- Drag
- contextMenu
- Html2canvas —— 基于javascript的截屏工具
- Modal
- 动态化窗口
- react-json-view ——json可视化，[源码库](https://github.com/mac-s-g/react-json-view)


> 在html2canvas中用antd的Image可以不用主动缩小图片尺寸

## 应用打包

- webpack


## 具体描述

### 1、Route

> 可以参考[这篇教程](http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteMatching.html)


路由有三种模式匹配：
> <span style="color: red;">注：正则匹配不能用！</span>
```jsx
<Route path="/hello/:name">         // 匹配 /hello/michael 和 /hello/ryan
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/michael 和 /hello/ryan
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/path/to/hello.jpg
```


子路由有两种写法
```jsx
<Route path={"/route"} component={MyRoute} />   //可以获取到props属性
//及
<Route path={"/route"}><MyRoute /></Route>      //不可以获取到，不过可以在export地方加上withRouter方法包裹
```


路由跳转的各方向生命周期的变化

参考[这里](http://react-guide.github.io/react-router-cn/docs/guides/advanced/ComponentLifecycle.html)

<span style="color: red; text-decoration: underline;">★</span> 主路由下添加

```jsx
<BrowserRouter basename={"/route"}> ... </BrowserRouter>
```

可以起一个基础路由的作用。
这样可以在复杂路由结构中解脱。
