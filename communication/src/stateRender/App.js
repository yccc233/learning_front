import React, { Component } from 'react';

export default class App extends Component{
    state = {
        name: "ycc"
    }
    
    componentDidMount() {
        this.setState();
    }
    
    render(){
        console.log(this.state);
        return(
            <div>
                <span>hello {this.state.name}</span>
            </div>
        );
    }
}