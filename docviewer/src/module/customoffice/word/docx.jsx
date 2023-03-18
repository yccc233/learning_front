import React, { Component } from 'react';
import { defaultOptions, renderAsync } from "docx-preview";

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
        'css': 'text/style',
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
    window.strs = base64Str;
    const bstr = window.atob(base64Str);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    const fileBlob = new Blob([u8arr], { type: typeDic[fileType] });
    return fileBlob;
}

/**
 * @param {*} fileStream
 * @param {*} type
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



export default Word;