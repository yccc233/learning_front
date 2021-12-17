

> 跳过具体描述

[TOC]

# 启用Jest

格式

```jsx
describe("xxxx", () => {
    //...
    it("xxxx", () => {
        //...
        expect("....").toBe("...");     // 全等 ===，用于值比较
        //或者
        expect("....").toEqual("...");  //似等 ==，用于对象比较
    });
});
```

# 启用Enzyme

只有`shallow`方法，也只需要这个。


## 静态
```jsx
import {shallow} from "enzyme"
let wrapper;
beforeEach(() => {  //这个是因为在it块中，有些wrapper会做些修改，所以导致状态不一致，这样可以在每次作用时都从初始状态开始，如果不这样做，也可以在每个it块中单独定义（测试模块多时代码量多）
    wrapper = shallow(<App />);   //获取组件的浅渲染
});
//在it块中通过expect函数接收下列方法传递回的参数 => false / true
warpper.contains(<th>Item</th>);                                 //完全匹配
wrapper.containsMatchingElement(<button>Add item</button>);      //合格匹配
```

## 动态
```jsx

```

# 结果

如下
```shell
...
 PASS  src/App.test.js
  测试全局APP
    ✓ 1号测试，测试包含th标签 (1ms)
    ✓ 2号测试，测试包含输入框 (2ms)
    ✓ 3号测试，测试按钮是否为禁用的 (2ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.682s, estimated 3s
Ran all test suites related to changed files.
...
```
