import React, {useCallback, useReducer} from "react";
import {Button} from "antd";

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error("无法捕捉动作：" + action.type);
    }
}

function Usereducer() {
    const [state, dispatch] = useReducer(reducer, {count: 0});

    const onClick =useCallback(() => {
        dispatch({type: "increment"});
    }, [])

    return <div>
        <Button onClick={onClick}>+1</Button>
        {state.count}
    </div>
}

export default Usereducer;
