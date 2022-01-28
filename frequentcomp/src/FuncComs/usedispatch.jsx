import React from "react";
import {createStore} from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import {Button} from "antd";

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {...state, count: state.count + 1};
        case 'decrement':
            return {...state, count: state.count - 1};
        default:
            return state;
    }
}

var store = createStore(reducer, {count: 0});

function Usedispatch() {
    return <div>
        <Provider store={store}>
            <Childapp />
        </Provider>
    </div>
}

function Childapp() {
    const count = useSelector(state => state.count);
    const dispatch = useDispatch();
    return <div>
        <Button onClick={() => dispatch({type: "increment"})} >+1</Button>
        {count}
    </div>
}

export default Usedispatch;
