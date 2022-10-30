import React, { Component } from 'react';
import { defaultOptions, renderAsync } from "docx-preview";
import $ from "jquery";

function Base64ToBlob(base64Str, fileType) {
    const typeDic = {
        'docx': 'application/msword',
        'doc': 'application/msword',
        'bin': 'application/octet-stream',
        'exe': 'application/octet-stream',
        'so': 'application/octet-stream',
        'dll': 'application/octet-stream',
        'pdf': 'application/pdf',
        'ai': 'application/postscript',
        'xls': 'application/vnd.ms-excel',
        'ppt': 'application/vnd.ms-powerpoint',
        'dir': 'application/x-director',
        'js': 'application/x-javascript',
        'swf': 'application/x-shockwave-flash',
        'xhtml': 'application/xhtml+xml',
        'xht': 'application/xhtml+xml',
        'zip': 'application/zip',
        'mid': 'audio/midi',
        'midi': 'audio/midi',
        'mp3': 'audio/mpeg',
        'rm': 'audio/x-pn-realaudio',
        'rpm': 'audio/x-pn-realaudio-plugin',
        'wav': 'audio/x-wav',
        'bmp': 'image/bmp',
        'gif': 'image/gif',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'css': 'text/css',
        'html': 'text/html',
        'htm': 'text/html',
        'txt': 'text/plain',
        'xsl': 'text/xml',
        'xml': 'text/xml',
        'mpeg': 'video/mpeg',
        'mpg': 'video/mpeg',
        'avi': 'video/x-msvideo',
        'movie': 'video/x-sgi-movie'
    }
    // 将base64转为blob对象
    // Buffer.from(data, 'base64') instaed
    const bstr = atob(base64Str);
    console.log(bstr.length);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    const fileBlob = new Blob([u8arr], { type: typeDic[fileType] });
    return fileBlob;
}

/**
 * @param {*} fileId
 */
class Word extends Component {
    componentDidMount() {

        let option = {
            ...defaultOptions
        };

        console.log("props", this.props);

        // const data = Base64ToBlob(this.props.fileStream, this.props.type);
        // console.log("data", this.props.fileStream);
        // renderAsync(
        //     this.props.fileStream,
        //     document.getElementById("custom-word"),
        //     null,
        //     option
        // );



        $.get('http://127.0.0.1:8080/bin/getstream').then(stream => {
            const data = Base64ToBlob(stream, this.props.type);
            console.log("data", data);
            renderAsync(
                data,
                document.getElementById("custom-word"),
                null,
                option
            );
        })
    }

    render() {
        return <div id="custom-word" style={{ width: "100%", height: "100%" }} />;
    }
}



export default Word;