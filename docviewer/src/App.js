import './App.css';
import CustomWorkSpace from './module/customoffice/workspace';
import {Routes, Route  } from "react-router-dom";
import ErrorBoundary from "./module/errorboundary";

function App() {
  return <Routes>
    <Route path={"/"} element={<CustomWorkSpace />} errorElement={<ErrorBoundary />}/>
    <Route path={"/customoffice"} element={<CustomWorkSpace />} errorElement={<ErrorBoundary />}/>
  </Routes>
}

export default App;
