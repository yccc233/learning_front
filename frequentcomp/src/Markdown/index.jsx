import React, {useEffect, useRef} from 'react';
import {message} from "antd";

const MarkdownViewer = ({markdownText}) => {

    const _marked = typeof window === 'object' ? window.marked : null;

    const divRef = useRef(null);

    const getMarkdownText = () => {
        console.log("rrr", _marked)
        return {__html: _marked && _marked.marked(markdownText)};
    };

    const handleTextSelect = () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            const selectedText = selection.toString();
            message.info(`你选择的文本是: ${selectedText}`);
        }
    };

    useEffect(() => {
        // 监听 mouseup 事件
        window.addEventListener('mouseup', handleTextSelect);

        // 清理事件监听器
        return () => {
            window.removeEventListener('mouseup', handleTextSelect);
        };
    }, []);

    return (
        <div ref={divRef} className={"mark-down"} dangerouslySetInnerHTML={getMarkdownText()}/>
    );
};


export default function Markdown(props) {

    const markdown = `
### 涉及方向

主要从
- Route
- Table
- Form
- Drag
- contextMenu
- Html2canvas —— 基于javascript的截屏工具
- Modal
- 动态化窗口
- react-json-view ——json可视化，[源码库](https://github.com/mac-s-g/react-json-view)


> 在html2canvas中用antd的Image可以不用主动缩小图片尺寸

## 应用打包

- webpack


## 具体描述

### 1、Route

> 可以参考[这篇教程](http://react-guide.github.io/react-router-cn/docs/guides/basics/RouteMatching.html)

    `

    return <div style={{width: "100%", height: "100%"}}>

        <MarkdownViewer markdownText={markdown}/>
    </div>
}