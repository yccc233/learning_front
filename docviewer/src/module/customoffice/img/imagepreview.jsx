
import { RotateLeftOutlined, RotateRightOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import React, { useState } from "react";

/**
 * 引入档卡的图像预览
 * @param {*} imgsrc 图像链接
 */
export default function ImagePreview({ imgsrc }) {
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [drag, setDrag] = useState(false);
    const [clickPoint, setClickPoint] = useState(undefined);

    return (
        <div className="image-preview-root">
            <div className="image-preview-mask" />
            <div tabIndex="-1" className="image-preview-wrap">
                <div role="dialog" aria-modal="true" className="image-preview">
                    <div className="image-preview-content">
                        <div className="image-preview-body">
                            <div className="image-preview-operations">
                                <ZoomInOutlined className="operations-operation" onClick={() => setScale(scale + 0.1)} />
                                <ZoomOutOutlined
                                    className={`operations-operation${scale <= 1 ? " disabled" : ""}`}
                                    onClick={() => {
                                        if (scale > 1) setScale(scale - 0.1);
                                    }}
                                />
                                <RotateRightOutlined
                                    className="operations-operation"
                                    onClick={() => {
                                        setRotate(rotate + 90);
                                    }}
                                />
                                <RotateLeftOutlined
                                    className="operations-operation"
                                    onClick={() => {
                                        setRotate(rotate - 90);
                                    }}
                                />
                            </div>
                            <div
                                className="image-preview-img-wrapper"
                                style={{ transform: `translate3d(${translate.x}px, ${translate.y}px, 0px)` }}
                                onMouseDown={event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    setClickPoint({ clientX: event.clientX, clientY: event.clientY });
                                    setDrag(true);
                                }}
                                onMouseMove={event => {
                                    event.stopPropagation();
                                    if (drag) {
                                        if (Math.abs(event.clientX - clickPoint.clientX) > 20 || Math.abs(event.clientY - clickPoint.clientY) > 20) {
                                            setTranslate({
                                                x: translate.x + event.clientX - clickPoint.clientX,
                                                y: translate.y + event.clientY - clickPoint.clientY
                                            });

                                            setClickPoint({ clientX: event.clientX, clientY: event.clientY });
                                        }
                                    }
                                }}
                                onMouseUp={event => {
                                    event.preventDefault();
                                    setDrag(false);
                                }}
                                onMouseLeave={event => {
                                    event.preventDefault();
                                    setDrag(false);
                                }}
                                onWheel={event => {
                                    let scaleTemp = scale + (event.deltaY / 100) * 0.1 >= 1 ? scale + (event.deltaY / 100) * 0.1 : 1;
                                    setScale(scaleTemp);
                                }}
                            >
                                <img
                                    className="image-preview-img"
                                    src={imgsrc}
                                    style={{ transform: `scale3d(${scale}, ${scale}, ${scale}) rotate(${rotate}deg)` }}
                                 alt={"图像构建失败"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
