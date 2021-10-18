import React,{ Component } from "react";
import {Context} from "./context";

export default class SubSub extends Component{
    render(){
        return(
            <Context.Consumer>
            {
                context => (
                    <div style = {{color: context.color }}>
                        SUBSUB
                        {console.log(context)}
    
                        <button onClick = { () => {
                            context.callback("hello a ");
                        }}
                            >点击我</button>
                    </div>
                )
            }
            </Context.Consumer>
            
        );
    }
}

