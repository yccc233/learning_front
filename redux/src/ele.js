import {useDispatch} from "react-redux";
import {useCallback} from "react";

const MyBut = () => {
    
    const dispatch = useDispatch();
    
    const increaseClick = useCallback(() => dispatch({type: "INCREASE"}), []);
    
    const decreaseClick = useCallback(() => dispatch({type: "DECREASE"}), []);
    
    return <>
        <button onClick={increaseClick}>/</button>
        <button onClick={decreaseClick}>\</button>
    </>
}

export default MyBut;