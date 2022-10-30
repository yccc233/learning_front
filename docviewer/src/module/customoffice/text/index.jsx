import React, { Component } from 'react';
import $ from "jquery"
class Text extends Component {
    state = {
        text: null
    }
    componentDidMount() {
        if (this.hasrender) return;
        this.hasrender = 1
        // const file = document.getElementById('input_file2').files[0];
        // let fileReader = new FileReader();
        // const that = this;
        // fileReader.onload = function (e) {
        //   console.log("data", e.target.result);
        //   that.setState({
        //     text: e.target.result
        //   });
        // }
        // fileReader.readAsArrayBuffer(file);

        $.get("http://127.0.0.1:8080/bin/readStream").then(data => {
            this.setState({ text: data })
            console.log(data);
        })
    }

    render() {
        return <div>
            {this.state.text}
        </div>
    }
}

export default Text;