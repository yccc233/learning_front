import './App.css';

import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Research from "./research";
import MyRoute from "./Route/MyRoute";
import MyTable from "./Table/MyTable";
import MyForm from "./Form/MyForm";
import DragWin from "./Drag/dragwin";
import Html2canvas from "./Html2canvas/Html2canvas";
import ContextX from "./ContextMenu/Context";
import MyModal from "./Modal/Modal";
import DynaWin from "./Dynawin/DynaWin";
import MyInput from "./Input/Myinput";
import MyTable2 from "./Table/MyTable2";
import Myinput2 from "./Input/Myinput2";
import JsonArea from "./TextArea/JsonArea";
import FuncComs from "./FuncComs/entry";
import Gojs from "./Gojs/entry";
import TinyMain from "./Tiny";
import WindowCom from "./window/win_com";
import WinDiv from "./window/win_div";
import RelationsGraph from "./RelationsGraph";
import Relation from "./customRelations/index";
import Upload from './fileuploader';
import AntdDesign from './antd';
import UseAvg from "./Image/useSvg";
import ExportData from "./exportData";
import Markdown from "./Markdown";

function App() {
    return (
        <div style={{width: "100%", height: "100%"}}>
            {/*这里Switch 和 exact 用一个就够了*/}
            <BrowserRouter basename={"/"}>
                <Switch>
                    <Route exact path={"/"} render={() => <Redirect to={"/home"}/>}/>
                    <Route path={"/Markdown"} render={Markdown}/>
                    <Route path={"/exportdata"} render={ExportData}/>
                    <Route path={"/research"} render={Research}/>
                    <Route path={"/svgimg"} render={UseAvg}/>
                    <Route path={"/uploadfile"} render={Upload}/>
                    <Route path={"/customrelations"} render={() => <Relation height={800}/>}/>
                    <Route path={"/relationsgraph"} component={RelationsGraph}/>
                    <Route path={"/windowdiv"} component={WinDiv}/>
                    <Route path={"/windowcom"} component={WindowCom}/>
                    <Route path={"/dynawin"} component={DynaWin}/>
                    <Route path={"/route"}><MyRoute/></Route>
                    <Route path={"/table"} component={MyTable}/>
                    <Route path={"/form"} component={MyForm}/>
                    <Route path={"/drag"} component={DragWin}/>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/html2canvas"} component={Html2canvas}/>
                    <Route path={"/contextmenu"} component={ContextX}/>
                    <Route path={"/modal"} component={MyModal}/>
                    <Route path={"/input"} component={MyInput}/>
                    <Route path={"/tablenew"} component={MyTable2}/>
                    <Route path={"/inputclear"} component={Myinput2}/>
                    <Route path={"/jsonarea"} component={JsonArea}/>
                    <Route path={"/reactfunc"} component={FuncComs}/>
                    <Route path={"/gojs"} component={Gojs}/>
                    <Route path={"/tinymain"} component={TinyMain}/>
                    <Route path={"/antd"} component={AntdDesign}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const Home = () => {
    return <div style={{textAlign: "center", margin: "50px 0"}}>
        <h2>markdown</h2>
        <Link to={"/Markdown"}>Go</Link>
        <Block/>
        <h2>导出数据</h2>
        <Link to={"/exportdata"}>Go</Link>
        <Block/>
        <h2>调研组件</h2>
        <Link to={"/research"}>Go</Link>
        <Block/>
        <h2>使用svg作为图标</h2>
        <Link to={"/svgimg"}>Go</Link>
        <Block/>
        <h2>上传文件</h2>
        <Link to={"/uploadfile"}>Go</Link>
        <Block/>
        <h2>自定义图谱</h2>
        <Link to={"/customrelations"}>Go</Link>
        <Block/>
        <h2>关系图调研</h2>
        <Link to={"/relationsgraph"}>Go</Link>
        <Block/>
        <h2>div随页面变化</h2>
        <Link to={"/windowdiv"}>Go</Link>
        <Block/>
        <h2>window自带的组件</h2>
        <Link to={"/windowcom"}>Go</Link>
        <Block/>
        <h2>小组件的配置或自定义(文本略缩)</h2>
        <Link to={"/tinymain"}>Go</Link>
        <Block/>
        <h2>gojs的图谱配置</h2>
        <Link to={"/gojs"}>Go</Link>
        <Block/>
        <h2>react函数组件</h2>
        <Link to={"/reactfunc"}>Go</Link>
        <Block/>
        <h2>JSON可视化</h2>
        <Link to={"/jsonarea"}>Go</Link>
        <Block/>
        <h2>表格2：可表内新增编辑</h2>
        <Link to={"/tablenew"}>Go</Link>
        <Block/>
        <h2>Input实时显示</h2>
        <Link to={"/input"}>Go</Link>
        <Block/>
        <h2>Input按钮清空</h2>
        <Link to={"/inputclear"}>Go</Link>
        <Block/>
        <h2>路由</h2>
        <Link to={"/route"}>Go</Link>
        <Block/>
        <h2>动态页面</h2>
        <Link to={"/dynawin"}>Go</Link>
        <Block/>
        <h2>表格数据</h2>
        <Link to={"/table"}>Go</Link>
        <Block/>
        <h2>表单</h2>
        <Link to={"/form"}>Go</Link>
        <Block/>
        <h2>拖放</h2>
        <Link to={"/drag"}>Go</Link>
        <Block/>
        <h2>截屏快照</h2>
        <Link to={"/html2canvas"}>Go</Link>
        <Block/>
        <h2>右键菜单</h2>
        <Link to={"/contextmenu"}>Go</Link>
        <Block/>
        <h2>antd弹窗</h2>
        <Link to={"/modal"}>Go</Link>
        <Block/>
        <h2>antd组件</h2>
        <Link to={"/antd"}>Go</Link>
    </div>
}

const Block = () => <div style={{width: "100%", height: "50px"}}/>

export default withRouter(App);
