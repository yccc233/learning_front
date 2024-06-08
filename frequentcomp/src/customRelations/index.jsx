/**
 * Created by hujj on 2021-2-24.
 * @author hujj
 * 修改 yc on 2022-9-26
 * 之前只是搭了个react的空架子
 * <13.关系探索>组件
 */
import React, {Component, Fragment} from 'react';
import {Space} from "antd";
import G6 from '@antv/g6';
import reactDom from 'react-dom';
import $ from "jquery";
import "./index.css";

const appPrefix = "frontcontrol";

export default class Relation extends Component {
    constructor(props) {
        super(props);

        this.cateToColor = {
            person: "#c6e5ff",
            phone: "#f6c0be",
            qq: "#daa9f1",
            weibo: "#ade5cb"
        };

        this.cateToPng = {
            phone: `/${appPrefix}/img/R/phone.png`,
            qq: `/${appPrefix}/img/R/qq.png`,
            weibo: `/${appPrefix}/img/R/weibo.png`
        };

        this.mainNodeColor = "#8bb4ee";

        this.cateToTip = {
            person: "人物",
            phone: "手机",
            qq: "QQ号",
            weibo: "微博"
        };

        this.nodes = [];
        this.edges = [];
        this.expandedNodes = [];

        this.graph = null;

        this.rightClick = this.rightClick.bind(this);
        this.menuClick = this.menuClick.bind(this);
        this.nodeRClick = this.nodeRClick.bind(this);
    }

    //初始化图谱，参数是格式化之后的数据
    initGraph(nodes = [], edges = []) {
        var that = this;

        const tooltip = new G6.Tooltip({
            offset: 10,
            getContent(e) {
                const outDiv = document.createElement('div');
                outDiv.innerHTML = `
                     <span style="white-space:nowrap;"><span style="color: #ccc; font-size: 12px;">类型：</span>${that.cateToTip[e.item.getModel().category]}</span>
                     <br />
                     <span style="white-space:nowrap;"><span style="color: #ccc; font-size: 12px;">数值：</span>${e.item.getModel().label}</span>
                     <br /><br />
                     <span style="white-space:nowrap;"><span style="color: #ccc; font-size: 12px;">右键显示菜单</span></span>
                 `;
                return outDiv;
            },
            itemTypes: ['node']
        });

        const grid = new G6.Grid();

        that.graph = new G6.Graph({
            container: 'relationsexpand',
            width: $("#relationsexpand").width(),
            height: this.props.height || 300,
            modes: {
                default: ['drag-canvas', 'drag-node', 'zoom-canvas', 'activate-relations']
            },
            //布局
            layout: {
                type: 'force',
                preventOverlap: true,
                fitCenter: true,
                linkDistance: 150 * Math.random() + 100,
                nodeStrength: -100,
                edgeStrength: 0.2
            },
            //默认节点样式
            defaultNode: {
                type: 'image',
                size: [260, 80],
                clipCfg: {
                    show: false,
                    type: 'circle',
                    r: 30,
                }
            },
            defaultEdge: {
                size: 2,
                color: '#e2e2e2'
            },
            plugins: [grid, tooltip]
        });

        console.log("渲染", nodes, edges);
        that.graph.data({nodes, edges});
        that.graph.render();
        // that.graph.fitView();

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

        that.graph.on('canvas:click', function (e) {
            $("#nodeContextMenu").hide(80);
        });

        that.graph.on('node:contextmenu', this.rightClick);
    }

    menuClick(ev, tocate) {
        $("#nodeContextMenu").hide(80);
        let fromCate = ev.item._cfg.model.category;
        let nodes, edges;
        if (fromCate === 'person') {
            nodes = genNodesSimple(tocate, Math.floor(Math.random() * 3));
            edges = genEdgesSimple(nodes.map(n => n.id), ev.item._cfg.model.id, "关联");
        } else if (tocate === 'person') {
            nodes = genNodesSimple(tocate, 1);
            edges = genEdgesSimple(nodes.map(n => n.id), ev.item._cfg.model.id, "所有人");
        } else {
            nodes = genNodesSimple(tocate, Math.floor(Math.random() * 3));
            edges = genEdgesSimple(nodes.map(n => n.id), ev.item._cfg.model.id, "相关好友");
        }
        this.nodes = this.nodes.concat(nodes);
        this.edges = this.edges.concat(edges);
        this.expandedNodes.push(ev.item._cfg.model.id);
        const nData = this.formatData(this.nodes, this.edges);
        this.setGraphData(nData.nodes, nData.edges);
    }

    nodeRClick(node, type) {
        console.log("noide", node);
        $("#nodeContextMenu").hide(80);
        switch (type) {
            case 'delete':
                this.expandedNodes.filter(n => n.id !== node.id);
                this.nodes = this.nodes.filter(n => n.id !== node.id);
                this.edges = this.edges.filter(e => e.source !== node.id && e.target !== node.id);
                const nData = this.formatData(this.nodes, this.edges);
                this.setGraphData(nData.nodes, nData.edges);
                break;
            default:
                break;
        }
    }

    rightClick(e) {
        const {category} = e.item._cfg.model;
        e.preventDefault();
        e.stopPropagation();
        let menulist, menuHeight = 0;

        switch (category) {
            case 'person':
                menulist = <ul>
                    <li className="prop" onClick={() => this.menuClick(e, 'phone')}>手机号</li>
                    <li className="prop" onClick={() => this.menuClick(e, 'weibo')}>微博账号</li>
                    <li className="prop" onClick={() => this.menuClick(e, 'qq')}>QQ账号</li>
                </ul>;
                menuHeight = 28 * 3;
                break;
            case 'qq':
                menulist = <ul>
                    <li className="prop" onClick={() => this.menuClick(e, 'person')}>账号所有人</li>
                    <li className="prop" onClick={() => this.menuClick(e, 'qq')}>好友列表</li>
                </ul>;
                menuHeight = 28 * 2;
                break;
            case 'weibo':
                menulist = <ul>
                    <li className="prop" onClick={() => this.menuClick(e, 'person')}>账号所有人</li>
                    <li className="prop" onClick={() => this.menuClick(e, 'weibo')}>好友列表</li>
                </ul>;
                menuHeight = 28 * 2;
                break;
            case 'phone':
                menulist = <ul>
                    <li className="prop" onClick={() => this.menuClick(e, 'person')}>手机号主</li>
                    <li className="prop" onClick={() => this.menuClick(e, 'phone')}>联系人列表</li>
                </ul>;
                menuHeight = 28 * 2;
                break;
            default:
                menulist = <ul>
                    <li className="prop" onClick={() => this.menuClick(e, 'person')}>账号所有人</li>
                </ul>;
                menuHeight = 28;
        }
        menulist = [menulist, (
            <Fragment>
                <hr style={{margin: 0}}/>
                <ul>
                    <li className="node" onClick={() => this.nodeRClick(e.item._cfg.model, 'delete')}>删除</li>
                </ul>
            </Fragment>
        )];
        menuHeight += 28 + 1;

        reactDom.render(menulist, document.getElementById("nodeContextMenu"));

        let top = e.canvasY + 10, left = e.canvasX + 10;
        let canvasHeight = this.props.height || 300;
        if (top > canvasHeight - menuHeight) top = canvasHeight - menuHeight;
        $("#nodeContextMenu").css({
            top: top,
            left: left
        });

        $("#nodeContextMenu").show(50);
    }

    setGraphData(nodes = [], edges = []) {
        console.log("渲染", nodes, edges);
        this.graph.changeData({nodes, edges});
        // 清缓存
        this.graph.refresh();
        // this.graph.layout(nodes);
        // this.graph.fitView();
    }

    // 格式化数据，2参
    formatData(nodes, edges) {
        nodes = nodes.map(n => {
            if (n.id === 'p1') {
                n.labelCfg = {style: {fontWeight: "bold", fill: "#000", fontSize: 15}};
                n.style = {fill: this.mainNodeColor};
                n.type = 'circle';
                n.size = 60;
                if (!this.expandedNodes.includes(n.id)) n.style = {...n.style, cursor: "pointer"}
                return n;
            }
            switch (n.category) {
                case 'person':
                    n.labelCfg = {style: {fontWeight: "bold", fill: "#666", fontSize: 14}};
                    n.type = 'circle';
                    n.size = 60;
                    break;
                case 'phone':
                case 'weibo':
                case 'qq':
                    n.labelCfg = {
                        style: {fontWeight: "bold", fill: this.cateToColor[n.category], fontSize: 14},
                        position: "bottom"
                    };
                    n.style = {stroke: this.cateToColor[n.category], lineWidth: 1};
                    n.img = this.cateToPng[n.category];
                    n.size = 40;
                    break;
                default: // 未知类型节点
                    n.labelCfg = {style: {fontWeight: "bold", fill: "#000", fontSize: 12}, position: "bottom"};
                    n.style = {fill: '#000'};
                    break;
            }
            if (!this.expandedNodes.includes(n.id)) n.style = {...n.style, cursor: "pointer"}
            return n;
        });
        return {nodes, edges};
    }

    componentDidMount() {
        this.nodes = [{id: "p1", label: "王同学", category: "person"}];
        const {nodes, edges} = this.formatData(this.nodes, []);
        this.initGraph(nodes, edges);
        setTimeout(() => {
            this.expandedNodes.push(this.nodes[0].id);
            this.nodes = this.nodes.concat([
                {id: "a1", label: "1263781234", category: "phone"},
                {id: "a2", label: "3628763486238", category: "weibo"},
                {id: "a3", label: "234623848236", category: "qq"},
            ]);
            this.edges = [
                {id: "e1", source: "a1", target: "p1", label: "关联"},
                {id: "e2", source: "a2", target: "p1", label: "关联"},
                {id: "e3", source: "a3", target: "p1", label: "关联"}
            ];
            const {nodes, edges} = this.formatData(this.nodes, this.edges);
            this.setGraphData(nodes, edges);
        }, 500);
    }

    render() {
        return (
            <div className={"relations_explore"} style={{height: this.props.height || 300}}>
                <div id={"relationsexpand"} style={{height: this.props.height || 300, position: "relative"}}/>
                <div id="nodeContextMenu"/>
                <div className="legend">
                    <Space>
                        <div className="circle" style={{background: this.mainNodeColor}}/>
                        <div>主体对象</div>
                    </Space>
                    <Space>
                        <div className="circle" style={{background: this.cateToColor['person']}}/>
                        <div>探索对象</div>
                    </Space>
                    <Space>
                        <img alt={""} src={this.cateToPng["phone"]} className="image"/>
                        <div>手机号</div>
                    </Space>
                    <Space>
                        <img alt={""} src={this.cateToPng["qq"]} className="image"/>
                        <div>QQ账号</div>
                    </Space>
                    <Space>
                        <img alt={""} src={this.cateToPng["weibo"]} className="image"/>
                        <div>微博账号</div>
                    </Space>
                </div>
            </div>
        );
    }
}


// TODO: ################# 以下是造假数据用的方法 ！！！！！！！！ ##################
/**pre = p,a */
// function genEdges(froms, to, pre, fromcate, tocate) {
//     if (pre === 'qq' && tocate === "qq") {
//         return froms.map(f => ({ id: "e" + Math.floor(Math.random() * 1000000), source: f, target: to, label: `qq好友` }));
//     } else if (pre === 'qq' && tocate === 'person') {
//         return froms.map(f => ({ id: "e" + Math.floor(Math.random() * 1000000), source: f, target: to, label: `号主` }));
//     }
//     return froms.map(f => ({ id: "e" + Math.floor(Math.random() * 1000000), source: f, target: to, label: pre === 'p' ? `${fromcate}好友列表` : "关联" }));
// }

function genEdgesSimple(froms, to, label) {
    return froms.map(f => ({id: "e" + Math.floor(Math.random() * 1000000), source: f, target: to, label: label}));
}

function genNodesSimple(category, count = 1) {
    let nodes = [];
    for (var i = 0; i < count; i++) {
        let label;
        if (category === 'person')
            label = ['赵', '钱', '孙', '李', '王', '高', '俞', '孙'][Math.floor(Math.random() * 8)] + "同学";
        else
            label = genRandomNum();
        nodes.push({id: category[0] + Math.floor(Math.random() * 1000000), label: label, category: category});
    }
    return nodes;
}

/**pre = p,a,qq */
// function genNodes(pre) {
//     let nodes = [];
//     if (pre === 'p') {
//         for (var i = 0; i < Math.floor(Math.random() * 3); i++) {
//             nodes.push({ id: pre + Math.floor(Math.random() * 1000000), label: ['赵', '钱', '孙', '李', '王', '高', '俞', '孙'][Math.floor(Math.random() * 8)] + "同学", category: "person" });
//         }
//     } else if (pre === 'qq') {
//         if (Math.random() < 0.5) {
//             for (var i = 0; i < Math.floor(Math.random() * 5); i++) {
//                 nodes.push({ id: 'p' + Math.floor(Math.random() * 1000000), label: genRandomNum(), category: 'qq' });
//             }
//         } else {
//             nodes.push({ id: pre + Math.floor(Math.random() * 1000000), label: ['赵', '钱', '孙', '李', '王', '高', '俞', '孙'][Math.floor(Math.random() * 8)] + "同学", category: "person" });
//         }
//     } else {
//         for (var i = 0; i < Math.floor(Math.random() * 5); i++) {
//             nodes.push({ id: pre + Math.floor(Math.random() * 1000000), label: genRandomNum(), category: ['phone', 'qq', 'weibo'][Math.floor(Math.random() * 3)] });
//         }
//     }
//     return nodes;
// }


function genRandomNum() {
    const s = "1234567890";
    let str = '';
    for (var i = -8; i < Math.random() * 5; i++) {
        str += s[Math.floor(Math.random() * s.length)];
    }
    return str;
}

// function genRandomStr() {
//     const s = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
//     let str = '';
//     for (var i = -8; i < Math.random() * 5; i++) {
//         str += s[Math.floor(Math.random() * s.length)];
//     }
//     return str;
// }
//
