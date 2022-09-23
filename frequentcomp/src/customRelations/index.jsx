import { CloseCircleFilled } from "@ant-design/icons";
import { Modal } from 'antd';
import React, { Component } from 'react';
import RocChart from "roc-charts";

window.RocChart = RocChart;

const pinkbk = "pink";

function genRandomStr() {
    const s = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    let str = '';
    for (var i = 0; i < Math.random() * 10; i++) {
        str += s[Math.floor(Math.random() * s.length)];
    }
    return str;
}

function genNodesLinks(end) {
    const newNodesLength = Math.floor(Math.random() * 10);
    const nodes = Array.from({ length: newNodesLength }).map((_, ind) => ({
        id: end + 1 + ind,
        name: genRandomStr()
    }));

    const links = Array.from({ length: Math.floor(Math.random() * newNodesLength) }).map(_ => {
        let fromId = Math.floor(Math.random() * (newNodesLength + end));
        let toId = Math.floor(Math.random() * (newNodesLength + end));
        toId === fromId && (toId = (toId + 1) % (newNodesLength + end));
        return {
            from: fromId,
            to: toId,
            text: "扩展"
        };
    })
    return { nodes, links };
}

function genNodes(end) {
    return Array.from({ length: Math.floor(Math.random() * 10) }).map((_, ind) => ({
        id: end + 1 + ind,
        name: genRandomStr()
    }));
}

function genLinks(nodeId, nodes) {
    return nodes.map(node => {
        let fromId, toId;
        if (Math.random > 0.5) {
            fromId = node.id;
            toId = nodeId;
        } else {
            fromId = nodeId;
            toId = node.id;
        }
        return {
            from: fromId,
            to: toId,
            text: "扩展"
        }
    })
}


/**
 * 关系扩展
 * @param {*} height            高度，组件高度
 */
class RelationsExpand extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.chart = null;
        this.nodes = [{ id: 1, name: "手机号" }];
        this.hasExpandNodes = [];
        this.links = [];
        this.chartSetup = false;                    // 已经配置了

        this.setup = this.setup.bind(this);
    }

    setup(nodeArray, linkArray) {
        // 静态配置
        RocChart.changeConfig({
            scene: {
                scale: {
                    max: 2,
                    min: .1,
                    step: .1
                }
            },
            node: {
                color: pinkbk,
                selectedColor: '#f6bb42',  // 选中的边框颜色
                fadeOpacity: .2,  // 淡化节点的透明度
            },
        });
        this.chart = new RocChart({
            id: "relationsexpand",
            type: "force",
            data: { nodes: nodeArray, links: linkArray }
        });
        // 配置项
        const config = {
            // 核心配置
            core: {
                // animation: false,  // 是否开启动画
            },
            // 插件的配置
            plugin: {
                // 插件的公共配置
                common: {
                    // 配置禁用的插件，默认为空，savelImg使用会报错
                    disable: ['saveImg'],
                    // 是否显示工具栏，默认为 true
                    toolbarShow: true,
                },
                // nodeInfo: {  // 展示节点信息插件配置
                //     getNodeInfo(node) {
                //         return new Promise((resolve, reject) => {
                //             setTimeout(() => {
                //                 resolve(`名称：${node.name}<br />类型：${node.type == "organisation" ? "企业目标" : "人员目标"}<br /><br /><span style="color: #aaa; font-size: 12px;">右键弹出功能列表</span>`);
                //             }, 500);
                //         });
                //     }
                // },
                // 右键菜单功能
                rightKey: {
                    keys: [{
                        name: "扩展关系",
                        click: ({ target, $chart }) => {
                            const nodeInfo = target.source;
                            this.hasExpandNodes.push(nodeInfo.id);
                            this.withNodeExpand(nodeInfo.id, $chart);
                        },
                        isShow: ({ isNode, target }) => {
                            // 判断点击的是节点才显示此按钮
                            return isNode && !this.hasExpandNodes.includes(target.source.id);
                        }
                    }, {
                        name: '隐藏节点',  // 右键菜单按钮显示的文本
                        /*
                        * @param isNode {bool} 是否为节点
                        * @param target {obj}  右键点击位置的目标对象
                        * @param $chart {obj} 当前图谱对象实例。同 new Chart(...) 得到的对象实例
                        */
                        click: ({ isNode, target, $chart }) => {
                            const node = target.source;  // 获取节点信息
                            $chart.util.hideNodes([node.id]);  // 使用 chart 的工具方法隐藏节点
                        },
                        // isShow 方法用于决定当前点击的右键菜单中是否显示这个按钮，这个方法需要返回一个 bool 值
                        isShow: ({ isNode, target, $chart }) => {
                            // 判断点击的是节点才显示此按钮
                            if (isNode) {
                                return true;
                            }
                        }
                    }, {
                        name: '复位',
                        click: ({ $chart }) => {
                            $chart.reset();
                        },
                        isShow: ({ isNode }) => {
                            return !isNode;
                        }
                    }]
                }
            }
        };
        // 初始化及配置
        this.chart.init(config);
    };

    withNodeExpand(extendId, chart) {
        // const { nodes, links } = genNodesLinks(this.nodes.length);
        const nodes = genNodes(this.nodes.length);
        const links = genLinks(extendId, nodes);
        console.log("扩展点线", extendId, [{ id: 2, name: "EsY" }], [{ from: 1, text: "扩展", to: 2 }]);
        window.chart = chart
        chart.extend(extendId, [{ id: 2, name: "EsY" }], [{ from: 1, text: "扩展", to: 2 }]);
        //     extendId,
        //     [{ id: 2, name: "EsY" }],
        //     [{ from: 1, text: "扩展", to: 2 }]
        // );
        this.nodes = this.nodes.concat(nodes);
        this.links = this.links.concat(links);
    }

    componentDidMount() {
        this.chartSetup = true;
        this.setup(this.nodes, []);
    }

    componentWillReceiveProps(prevProps, prevState) {
        if (this.props.height > 0 && !this.chartSetup) {
            this.chartSetup = true;
            this.setup(this.nodes, []);
        }
    }

    render() {
        return (
            <div style={{ height: this.props.height || 100 }}>
                <div id={"relationsexpand"} style={{ height: this.props.height || 100, position: "relative" }} />
            </div>
        );
    }
}

/**
 * @param {*} visible 可视
 * @param {*} setVisible 可视
 */
const RelationsExpandModal = (props) => (
    <Modal
        destroyOnClose
        footer={null}
        closable={false}
        maskClosable={false}
        visible={true}
        bodyStyle={{ padding: 0 }}
        width={1200}
    >
        {console.log("props", props)}
        <CloseCircleFilled
            style={{
                color: "#000",
                position: "absolute",
                zIndex: 1,
                right: 6,
                top: 6,
                cursor: "pointer",
                fontSize: 16
            }}
            // onClick={() => props.setVisible(false)}
        />
        <RelationsExpand height={500} />
    </Modal>
)

export { RelationsExpandModal, RelationsExpand };
