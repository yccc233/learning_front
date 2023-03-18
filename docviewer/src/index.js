import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {ConfigProvider} from "antd";
import zh from "antd/es/locale/zh_CN";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ConfigProvider locale={zh}>
          <BrowserRouter basename={"/"}>
              <App />
          </BrowserRouter>
      </ConfigProvider>

  </React.StrictMode>
);
