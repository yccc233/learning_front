import React, { Component } from 'react';

import Foo from "./SubA";
import Boo from "./SubB";

export default class App extends Component{
    render(){
        return(
            <div>
                <Foo />
                <Boo />
            </div>
        );
    }
}