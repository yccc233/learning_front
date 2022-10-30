module.exports = () => {
    /**
     * 加工uri
     * @param str 请求uri，编码后的
     * @returns {{...}} 返回解码键值对
     */
    const getParse = (str) => {
        let params = {};
        str.split('&').map( kv => {
            kv = kv.split('=');
            params[kv[0]] = kv[1];
        });
        return params;
    }

    return {
        getParse: getParse,
        postParse: getParse
    }
}