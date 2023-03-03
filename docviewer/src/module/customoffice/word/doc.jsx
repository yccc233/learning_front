import React, { Component } from 'react';
import { defaultOptions, renderAsync } from "docx-preview";


/**
 * @param {*} fileId
 */
class Word extends Component {
    componentDidMount() {
        let option = {
            ...defaultOptions
        };

        const data = new Blob([this.props.fileStream], { type: this.props.type });
        renderAsync(
            data,
            document.getElementById("custom-word"),
            null,
            option
        );
    }

    render() {
        return <div id="custom-word" style={{ width: "100%", height: "100%" }} />;
    }
}


