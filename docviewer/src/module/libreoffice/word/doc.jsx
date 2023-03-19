import React, {Component} from 'react';

var $ = require("jquery");

/**
 * @param {*} fileStream
 * @param {*} type
 */
class Word extends Component {
    componentDidMount() {
        if (this.props.fileStream) {
            $.post('http://localhost:8080/transfer/getPDFfile', {fileStream: this.props.fileStream, fileType: this.props.type})
                .then(res => {
                    console.log(res)
                })
        }
    }

    render() {
        return <div id="custom-word-doc" style={{width: "100%", height: "100%"}}/>;
    }
}


export default Word;