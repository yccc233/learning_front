import {useDispatch} from "react-redux";
import {useCallback} from "react";

const MyBut = () => {

    const dispatch = useDispatch();

    // eslint-disable-next-line
    const increaseClick = useCallback(() => dispatch({type: "INCREASE"}), []);

    // eslint-disable-next-line
    const decreaseClick = useCallback(() => dispatch({type: "DECREASE"}), []);

    return <>
        <button onClick={increaseClick}>/</button>
        <button onClick={decreaseClick}>\</button>
    </>
}

export default MyBut;
