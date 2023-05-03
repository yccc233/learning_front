/**
 * 工具包
 */
import bBuffer from "../../node_modules/buffer/index";
import jschardet from "jschardet";
/**
 * @param stream        输入流
 * @param type          转化类型，gbk，默认utf8
 * @returns {string}
 */
export const transformStream = (stream, type) => {
    var bytes = bBuffer.Buffer.from(stream, "base64");
    switch (type) {
        case "gbk":
            return new TextDecoder(type).decode(bytes);
        default:            // utf8
            return bytes.toString(type);
    }
};

export const translateStream = (stream) => {
    var arraybuffer = bBuffer.Buffer.from(stream );
    console.log(jschardet.detect(arraybuffer));
};


const typeDic = {
    'docx': 'application/msword',
    'doc': 'application/msword',
    'bin': 'application/octet-stream',
    'exe': 'application/octet-stream',
    'so': 'application/octet-stream',
    'dll': 'application/octet-stream',
    'pdf': 'application/pdf',
    'ai': 'application/postscript',
    // 'xls': 'application/vnd.ms-excel',
    'xls': 'application/x-xls',
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
};
/**
 * @param str           BASE64字符串
 * @param type          转化类型
 * @returns {Blob}
 */
export const base64toBlob = (str, type) => {
    const bst = atob(str);
    let n = bst.length;
    const nBrr = new Uint8Array(n);
    while (n--) nBrr[n] = bst.charCodeAt(n);
    return new Blob([nBrr], {type: typeDic[type]});
};
export const base64toArrayBuffer = (str)=> {
    let binary_string = window.atob(str);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
};

// 首字母大写
export const customCaptain = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};