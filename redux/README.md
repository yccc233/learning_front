# Redux

可以与组件一起看作是一个V字型结构

组件与声明（`mapStateToProps`和`mapDispatchToProps`）是没有关系的，
但是需要通过底层的connect方法连接。

connect方法来源于`react-redux`。


## 开始

属性管理需要3个步骤
1. 定义一个reducer，包括初始化state和动作action，返回状态
```jsx
const reducer = (state = {value: 0}, action) => {
    switch (action.type) {
        case 'INCREASE':
            return { value: state.value + 1 };
        case 'DECREASE':
            return { value: state.value - 1 };
        default:
            return state;
    }
}
```
2. 在最外层定义一个store，命名为createStore
```jsx
const store = createStore(reducer);
```
3. 在App层外包裹Provider，需要`react-redux`包
```jsx
<Provider store={store} >
    <App />
</Provider>
```

## 主要从两个角度去使用

1. class中使用

   在class中使用，和上下文有些不同，上下文中，从父组件传入的value，在这里使用`{value =>}`就可以，但是redux不同，因为你还没有订阅事件，所以需要`connect`来包裹dispatch和state的关系并连接上class组件。
   直接看：
```jsx
const mapStateToProps = (state) => {
    console.log(state)
    return {value: state.value}
}

const mapDispatchToProps = (dispatch) => {
    return {
        increaseClick: () => dispatch({type: "INCREASE"}),
        decreaseClick: () => dispatch({type: "DECREASE"})
    }
}

class App extends React.Component {
    //...
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

2. 函数组件中

   函数组件可以直接通过hook使用，`import {useDispatch} from "react-redux";`。
```jsx
const MyBtns = (props) => {

    const dispatch = useDispatch();

    const increaseClick = useCallback(() => dispatch({type: "INCREASE"}), []);
    const decreaseClick = useCallback(() => dispatch({type: "DECREASE"}), []);

    return  <>
        <button onClick={increaseClick}>+</button>
        <button onClick={decreaseClick}>-</button>
    </>;
}
```

## 拓展

- 多个reducer合并
  使用`redux`的`combineReducers`可以合并多个，且返回reducer，格式如下：
```jsx
export default combineReducers({reducer1, reducer2});
```

## 源码层次
暂时略吧...
