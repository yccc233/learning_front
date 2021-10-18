import React from "react";
import Sub from "./Sub";
import {Context} from "./context";

export default class App extends React.Component{
  
  callback(msg){
    console.log(msg)
  }
  
  render(){
    return(
        <div>
          <Context.Provider value={{color: "red", callback: this.callback}}>
            <Sub />
          </Context.Provider>
        </div>
    );
  }
}



