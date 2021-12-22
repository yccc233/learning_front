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

## 组件中的映射

在上节中使用时，需要使用`connect`方法包裹组件，并且通过`mapStateToProps`，`mapDispatchToProps`两个方法管理状态和动作。
此节来源于[https://blog.csdn.net/suwu150/article/details/79415085](https://blog.csdn.net/suwu150/article/details/79415085)
- `mapStateToProps`
  
    `mapStateToProps`是一个函数，用于建立组件跟 store 的 state 的映射关系。作为一个函数，它可以传入两个参数，结果一定要返回一个 object 传入mapStateToProps之后，会订阅store的状态改变，在每次 store 的 state 发生变化的时候，都会被调用 ownProps代表组件本身的props，如果写了第二个参数ownProps，那么当prop发生变化的时候，mapStateToProps也会被调用。例如，当 props接收到来自父组件一个小小的改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算。 mapStateToProps可以不传，如果不传，组件不会监听store的变化，也就是说Store的更新不会引起UI的更新

- `mapDispatchToProps`

  `mapDispatchToProps`用于建立组件跟store.dispatch的映射关系,可以是一个object，也可以传入函数。如果mapDispatchToProps是一个函数，它可以传入dispatch,ownProps, 定义UI组件如何发出action，实际上就是要调用dispatch这个方法


## 拓展

- 多个reducer合并
  使用`redux`的`combineReducers`可以合并多个，且返回reducer，格式如下：
```jsx
export default combineReducers({reducer1, reducer2});
```

## 源码层次
暂时略吧...
