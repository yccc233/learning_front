import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";

const MyBut = () => {

    const dispatch = useDispatch();
    const {value} = useSelector(state => state.value);

    // eslint-disable-next-line
    const increaseClick = () => dispatch({type: "INCREASE"});

    // eslint-disable-next-line
    const decreaseClick = () => dispatch({type: "DECREASE"});

    console.log("函数组件获取redux", value)
    return <>
        <button onClick={increaseClick}>/</button>
        <button onClick={decreaseClick}>\</button>
    </>
}

export default MyBut;
