import React, {Component} from 'react';
import {Button, InputNumber, Popover, Typography} from "antd";
import {
    ZoomInOutlined,
    ZoomOutOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import * as PDFJS from "pdfjs-dist/legacy/build/pdf";
import {base64toBlob} from "../../utils";
import {LoadingCustom} from "../../components/commons";

// 设置pdf.worker.js文件的引入地址
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry");

const {Paragraph, Text} = Typography;

class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, scale: 1, page: 1, numPages: 1, configStatus: 1			// 配置状态 1 显示 0 收起
        };
        this.pdfDoc = null;
        this.inputnumber = null;
        this.rerender = this.rerender.bind(this);
    }

    componentDidMount() {
        const fileStream = this.props.fileStream;
        if (fileStream) {
            const data = base64toBlob(fileStream, this.props.type);
            PDFJS.getDocument(window.URL.createObjectURL(data))
                .promise.then(pdfDoc => {
                this.pdfDoc = pdfDoc;
                window.pdfDoc = pdfDoc;
                this.setState({numPages: pdfDoc.numPages}, () => this.rerender());
            });
            const that = this;

            document.onkeyup = function (event) {
                event.stopPropagation();
                if (event.keyCode === 13) {
                    const {scale, page} = that.state;
                    that.rerender(scale, event.shiftKey ? page - 1 : page + 1);
                }
            }
        } else {
            console.error("请配置预览方式");
        }
    }

    rerender(scale = 1, page = 1) {
        if (this.pdfDoc) {
            page = Math.floor(page);
            if (page < 1 || isNaN(page)) page = 1; else if (page > this.pdfDoc.numPages) page = this.pdfDoc.numPages;

            if (scale < 0.1) scale = 0.1; else if (scale > 10) scale = 10;

            this.pdfDoc.getPage(page).then(pageContent => {
                // 设置canvas相关的属性
                const canvas = document.getElementById("pdf-canvas");
                const ctx = canvas.getContext("2d");
                const dpr = window.devicePixelRatio || 1;
                const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
                const ratio = dpr / bsr;
                const viewport = pageContent.getViewport({scale: scale});
                canvas.width = viewport.width * ratio;
                canvas.height = viewport.height * ratio;
                canvas.style.width = viewport.width + "px";
                canvas.style.height = viewport.height + "px";
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
                const renderContext = {
                    canvasContext: ctx, viewport: viewport,
                };
                // 数据渲染到canvas画布上
                pageContent.render(renderContext);
            }).catch(e => console.error(e));

            this.setState({
                loading: false, page: page, scale: scale
            })
        }
    }

    render() {
        const {loading, page, numPages, scale, configStatus} = this.state;
        return <div id="custom-pdf" className="pdf">
            {loading && <LoadingCustom/>}
            <div className={`toolbar-util${configStatus == 0 ? " hide-toolbar" : ''}`}>
				<span>
					<Button type="link" className="button" icon={<ZoomOutOutlined/>}
                            onClick={() => this.rerender(scale - 0.1, page)}/>
                    {scale.toFixed(2)}<span className="desc"> 倍率</span>
					<Button type="link" className="button" icon={<ZoomInOutlined/>}
                            onClick={() => this.rerender(scale + 0.1, page)}/>
				</span>
                <div style={{flex: 1}}/>
                <div className={"vhcenter"}>
					<Popover
                        placement="bottom"
                        content={TipContent}
                    >
						<QuestionCircleOutlined className="help"/>
					</Popover>
				</div>
                <InputNumber
                    style={{width: 100}}
                    placeholder={"回车前往"}
                    onChange={value => this.inputnumber = value}
                    onPressEnter={() => this.rerender(scale, this.inputnumber)}
                />
                <Button type="link" onClick={() => this.rerender(scale, page - 1)} disabled={page === 1}>上一页</Button>
                <Button type="link" onClick={() => this.rerender(scale, page + 1)}
                        disabled={page === numPages}>下一页</Button>
                <span style={{lineHeight: 2}}>
					<span className="desc">当前在第 </span>{page}<span className="desc"> 页，共 </span>{numPages}<span
                    className="desc"> 页</span>
				</span>
            </div>
            {/* <span className="config" onClick={() => this.setState({ configStatus: configStatus == 0 ? 1 : 0 })}>
				{configStatus == 0 ? <DownCircleOutlined /> : <UpCircleOutlined />}
			</span> */}
            <div style={{flex: 1, overflow: "auto", textAlign: "center"}}>
                <canvas id="pdf-canvas"/>
            </div>
        </div>;
    }
}


const TipContent = () => (
    <Typography className="customoffice">
        <Paragraph>
            <Text keyboard style={{color: "#666"}}>Enter</Text>跳至下一页
        </Paragraph>
        <Paragraph>
            <Text keyboard>Shift</Text>+<Text keyboard>Enter</Text>跳至上一页
        </Paragraph>
    </Typography>
);

export default Pdf;