import React, {useCallback, useState} from "react";
import {Button} from "antd";
import "./css/App.css";
import MyModal from "./components/MyModal/MyModal";

function App(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);

    const gojsClick_react = useCallback(() => {
        setModalType("gojs_react")
        setModalVisible(true);
    }, []);

    const echartClick_react = useCallback(() => {
        setModalType("echart_react")
        setModalVisible(true);
    }, []);

    const gojsClick_js = useCallback(() => {
        setModalType("gojs_js")
        setModalVisible(true);
    }, []);

    const echartClick_js = useCallback(() => {
        setModalType("echart_js")
        setModalVisible(true);
    }, []);

    const handleOk = () => {
        setModalVisible(false);
    };
    const handleCancel = () => {
        setModalVisible(false);
    };

    console.log(modalType, modalVisible)
    return (
        <>
            <div style={{width: "100%", textAlign: "center"}}>
                <header className="head">GOJS及ECharts</header>
                <div className="divide">react版本</div>
                <section>
                    <Button type="primary" className="button" onClick={gojsClick_react}>Gojs</Button>
                    <Button type="primary" className="button" onClick={echartClick_react}>EChart</Button>
                </section>
                <div className="divide">js版本</div>
                <section>
                    <Button type="primary" className="button" onClick={gojsClick_js}>Gojs</Button>
                    <Button type="primary" className="button" onClick={echartClick_js}>EChart</Button>
                </section>
                {
                    modalVisible && <MyModal
                        visible={modalVisible}
                        title="学习"
                        type={modalType}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    />

                }
            </div>
        </>
    );
}

export default App;
