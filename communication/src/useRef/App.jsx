import React, {useCallback, useImperativeHandle, useRef, useState} from "react";

const SonCom = React.forwardRef((props, ref) => {

    //定义一个变量
    const [val, setVal] = useState();

    //使用内置方法绑定到父组件的ref上
    useImperativeHandle(ref, () => ({
        val: val
    }), [val]);

    //输入事件
    const Cha = useCallback((event) => {
        setVal(event.target.value);
    }, [])

    //渲染一个input组件 使用ref绑定
    // 在使用useImperativeHandle方法的时候, 这里的ref没什么作用
    return <div>
        <input ref={ref} onChange={Cha}/>
    </div>
})


function App() {

    //定义一个引用
    const inputRef = useRef();

    //定义一个点击事件，输出inputRef引用的内容
    const cli = useCallback(() => {
        console.log(inputRef.current, inputRef.current.val)
    }, []);

    //渲染两个组件，一个 子组件，一个按钮
    return <div>
        <SonCom ref={inputRef} />
        <button onClick={cli}>终端显示数据</button>
    </div>
}

export default App;
