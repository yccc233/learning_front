import React, {Component} from 'react';
import {transformStream, translateStream} from "../../utils";

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stream: null,
            texts: null,
            decode: 'utf8'
        };
    }

    componentDidMount() {
        if (this.props.fileStream) {
            translateStream(this.props.fileStream);
            this.setState({
                stream: this.props.fileStream,
                texts: transformStream(this.props.fileStream, 'utf8'),
                decode: 'utf8'
            });
        }
    }

    render() {
        return <div>
            {this.state.texts}
        </div>
    }
}

export default Text;