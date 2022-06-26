import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN"
import "antd/dist/antd.css";


ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider
            locale={zhCN}
        >
            <BrowserRouter basename={"/"}>
                <App />
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
