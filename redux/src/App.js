import React, {useCallback} from "react";
import {connect, useDispatch} from "react-redux";
import MyBut from "./ele";


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
    render() {
        console.log(this.props)
        const {value, increaseClick,decreaseClick} = this.props;
        return (
            <div style={{
                width: "100%",
                textAlign: "center"
            }}>
                <label>{ value }</label>
                <div>
                    <button onClick={increaseClick}>增加</button>
                    <button onClick={decreaseClick}>减少</button>
                </div>
                <div>
                    <MyBtns />
                </div>
                <div> 
                    <MyBut />
                </div>
            </div>
        );
    }
}

const MyBtns = (props) => {
    
    const dispatch = useDispatch();
    
    const increaseClick = useCallback(() => dispatch({type: "INCREASE"}), []);
    
    const decreaseClick = useCallback(() => dispatch({type: "DECREASE"}), []);
    
    return  <>
        <button onClick={increaseClick}>+</button>
        <button onClick={decreaseClick}>-</button>
    </>;
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

