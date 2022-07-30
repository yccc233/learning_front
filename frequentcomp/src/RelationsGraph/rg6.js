/**
 * roc-chart
 */
// import React, {useEffect, useState} from 'react';

import Chart from 'roc-charts';
import {SearchOutlined} from "@ant-design/icons";
import data from "./data/rg6.json";

// 生成随机字符串
function randomString(len) {
    len = len || parseInt(Math.random() * 5, 10) + 2;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

export default function init() {
    const chartData = {
        nodes:data.nodes,
        links:data.links
    };
    const config = {
        plugin: {
            core: {
                // animation: false,
                watermark: {
                    image: <SearchOutlined />,
                    width: 300,
                    height: 300,
                },
                initPlugin: true,
                // initPlugin: false
            },
            nodeInfo: {
                async getNodeInfo(node) {
                    return await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(randomString(150));
                        }, 1000);
                    });
                }
            },
            rightKey: {
                // keys 的值为数组，每一项为一个菜单按钮功能
                keys: [{
                    name: '隐藏节点',  // 右键菜单按钮显示的文本
                    click: ({ isNode, target, $chart }) => {
                        const node = target.source;  // 获取节点信息
                        $chart.util.hideNodes([node.id]);  // 使用 chart 的工具方法隐藏节点
                    },
                    // isShow 方法用于决定当前点击的右键菜单中是否显示这个按钮，这个方法需要返回一个 bool 值
                    isShow({ isNode, target, $chart }) {
                        // 判断点击的是节点才显示此按钮
                        if (isNode) {
                            return true;
                        }
                    }
                }, {
                    name: '复位',
                    click({ $chart }) {
                        $chart.reset();
                    },
                },]
            }
        }
    };

    const chart = new Chart({
        id: 'rocchartrg6',  // 绘制图谱 dom 的 id
        type: 'force',  // 图谱类型
        data: chartData,  // 图谱数据
    });
    chart.init(config);  // 调用 init 方法绘图，配置项可选
}
