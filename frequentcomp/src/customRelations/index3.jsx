import { CloseCircleFilled } from "@ant-design/icons";
import { Modal } from 'antd';
import React, { Component } from 'react';
import G6 from '@antv/g6';

/**
 * 关系扩展
 * @param {*} height            高度，组件高度
 */
class RelationsExpand extends Component {
    constructor(props) {
        super(props);

        this.cateToColor = {
            person: "#8bb4ee",
            phone: "#f6c0be",
            qq: "#daa9f1",
            weibo: "#ade5cb"
        };

        this.cateToPng = {
            phone: '/img/phone.png',
            qq: '/img/qq.png',
            weibo: '/img/weibo.png'
        };

        this.cateToTip = {
            person: "人物实体",
            phone: "手机",
            qq: "QQ号",
            weibo: "微博账户"
        };

        this.nodes = [];
        this.edges = [];
        this.expandedNodes = [];

        this.graph = null;

        this.dbClick = this.dbClick.bind(this);
    }

    //初始化图谱，参数是格式化之后的数据
    initGraph(nodes = [], edges = []) {
        var that = this;

        const tooltip = new G6.Tooltip({
            offsetX: 10,
            offsetY: 10,
            getContent(e) {
                const outDiv = document.createElement('div');
                // outDiv.style.width = '180px';
                outDiv.innerHTML = `
                    <span style="color: #ccc; font-size: 12px;">类型：</span>${that.cateToTip[e.item.getModel().category]}
                    <br />
                    <span style="color: #ccc; font-size: 12px;">数值：</span>${e.item.getModel().label}
                    <br /><br />
                    <span style="color: #ccc; font-size: 12px;">双击拓展结点</span>
                `;
                return outDiv;
            },
            itemTypes: ['node']
        });

        that.graph = new G6.Graph({
            container: 'relationsexpand',
            width: 1200,
            height: this.props.height,
            modes: {
                default: ['drag-canvas', 'drag-node', 'zoom-canvas', 'activate-relations']
            },
            //布局
            layout: {
                type: 'force',
                preventOverlap: true,
                fitCenter: true,
                linkDistance: d => {
                    return 200;
                },
                nodeStrength: d => {
                    return -40;
                },
                edgeStrength: d => {
                    return 0.2;
                },
            },
            //默认节点样式
            defaultNode: {
                type: 'image',
                size: [260, 80],
                clipCfg: {
                    show: false,
                    type: 'circle',
                    // circle
                    r: 30,
                    style: {
                        lineWidth: 1,
                    },
                },
                style: {
                    cursor: "pointer"
                }
            },
            defaultEdge: {
                size: 2,
                color: '#e2e2e2'
            },
            nodeStateStyles: {
                highlight: {
                    opacity: 1,
                },
                dark: {
                    opacity: 0.1,
                },
            },
            edgeStateStyles: {
                highlight: {
                    stroke: '#999',
                },
            },
            plugins: [tooltip]
        });

        console.log("渲染", nodes, edges);
        that.graph.data({ nodes, edges });
        that.graph.render();

        that.graph.on('node:dragstart', function (e) {
            that.graph.layout();
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
        });
        that.graph.on('node:drag', function (e) {
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
        });
        that.graph.on('node:dragend', function (e) {
            e.item.get('model').fx = null;
            e.item.get('model').fy = null;
        });

        that.graph.on('node:dblclick', this.dbClick)
    }

    // 双击节点了，拓展，简单操作
    dbClick(ev) {
        const { item } = ev;
        const { id, category } = item._cfg.model;
        if (!this.expandedNodes.includes(id)) {
            let nodes;
            if (category === "person") {
                nodes = genNodes('a');
            } else {
                nodes = genNodes('p');
            }
            let edges = genEdges(nodes.map(n => n.id), id, category === "person" ? 'a':'p', this.cateToTip[category]);

            const nData = this.formatData(nodes, edges);

            this.nodes = this.nodes.concat(nData.nodes);
            this.edges = this.edges.concat(nData.edges);
            this.expandedNodes.push(id);
            this.setGraphData(this.nodes, this.edges);
        }
    }

    setGraphData(nodes = [], edges = []) {
        console.log("渲染", nodes, edges);
        this.graph.changeData({ nodes, edges });
        // 清缓存
        this.graph.refresh();
        this.graph.layout(nodes);
    }

    // 格式化数据，2参
    formatData(nodes, edges) {
        nodes = nodes.map(n => {
            switch (n.category) {
                case 'person':
                    n.labelCfg = { style: { fontWeight: "bold", fill: "#000", fontSize: 16 } };
                    n.style = { fill: this.cateToColor[n.category] };
                    n.type = 'ellipse';
                    n.size = [100, 60];
                    break;
                case 'phone':  case 'weibo': case 'qq':
                    n.labelCfg = { style: { fontWeight: "bold", fill: this.cateToColor[n.category] , fontSize: 14 }, position: "bottom" };
                    n.style = { stroke: this.cateToColor[n.category] };
                    n.img = this.cateToPng[n.category];
                    n.size = 40;
                    break;
                default: // 未知类型节点
                    n.labelCfg = { style: { fontWeight: "bold", fill: "#000", fontSize: 12 }, position: "bottom" };
                    n.style = { fill: '#000'};
                    break;
            }
            return n;
        });
        edges = edges.map(e => {
            // e.labelCfg = { style: { stroke:"#67a1ff", fontSize: 12 }}
            return e;
        })
        return { nodes, edges };
    }

    componentDidMount() {
        this.nodes = [{ id: "p1", label: "王同学", category: "person" }];
        const { nodes, edges } = this.formatData(this.nodes, []);
        this.initGraph(nodes, edges);

        setTimeout(() => {
            this.expandedNodes.push(this.nodes[0].id);

            this.nodes = this.nodes.concat([
                { id: "a1", label: "1263781234", category: "phone" },
                { id: "a2", label: "3628763486238", category: "weibo" },
                { id: "a3", label: "234623848236", category: "qq" },
            ]);
            this.edges = [
                { id: "e1", source: "a1", target: "p1", label:"所有" },
                { id: "e2", source: "a2", target: "p1", label:"所有" },
                { id: "e3", source: "a3", target: "p1", label:"所有" }
            ];

            const { nodes, edges } = this.formatData(this.nodes, this.edges);

            this.setGraphData(nodes, edges);
        }, 500);
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
        centered
        footer={null}
        closable={false}
        maskClosable={false}
        visible={props.visible || true}
        bodyStyle={{ padding: 0 }}
        width={1200}
    >
        <CloseCircleFilled
            style={{
                color: "#000",
                position: "absolute",
                zIndex: 1,
                right: 6,
                top: 6,
                cursor: "pointer",
                fontSize: 20
            }}
            title={"关闭"}
            onClick={() => props.setVisible(false)}
        />
        <RelationsExpand height={600} />
    </Modal>
)

export { RelationsExpandModal, RelationsExpand };







//TODO 以下是造假数据用的方法
/**pre = p,a */
function genEdges(froms, to, pre,cate) {
    return froms.map(f => ({ id: "e" + Math.floor(Math.random() * 1000000), source: f, target: to, label: pre==='p'?`${cate}好友列表`:"所有" }));
}

/**pre = p,a */
function genNodes(pre) {
    let nodes = [];
    if (pre === 'p') {
        for (var i = 0; i < Math.floor(Math.random() * 3); i++) {
            nodes.push({ id: pre + Math.floor(Math.random() * 1000000), label: ['赵', '前', '孙', '李', '王', '高', '俞', '孙'][Math.floor(Math.random() * 8)] + "同学", category: "person" });
        }
    } else {
        for (var i = 0; i < Math.floor(Math.random() * 5); i++) {
            nodes.push({ id: pre + Math.floor(Math.random() * 1000000), label: genRandomNum(), category: ['phone', 'qq', 'weibo'][Math.floor(Math.random() * 5)] });
        }
    }
    return nodes;
}


function genRandomNum() {
    const s = "1234567890";
    let str = '';
    for (var i = 0; i < Math.random() * 10; i++) {
        str += s[Math.floor(Math.random() * s.length)];
    }
    return str;
}
function genRandomStr() {
    const s = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    let str = '';
    for (var i = 0; i < Math.random() * 10; i++) {
        str += s[Math.floor(Math.random() * s.length)];
    }
    return str;
}

