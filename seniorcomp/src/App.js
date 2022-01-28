import './App.css';
import {Route, Link, BrowserRouter, Redirect} from "react-router-dom";
import OfflineMap from "./map/offlinemap";


function App() {
  return (
      <div style={{width: "100%"}}>
        {/*这里Switch 和 exact 用一个就够了*/}
        <BrowserRouter basename={"/"}>
            <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
            <Route path={"/home"} component={Home} />
            <Route path={"/offlinemap"} component={OfflineMap} />
        </BrowserRouter>
      </div>
  );
}

const Home = () => {
  return <div style={{textAlign: "center", margin: "50px 0"}}>
    <h2>离线地图</h2>
    <Link to={"/offlinemap"}>Go</Link>
    <Block />
  </div>
}

const Block = () => <div style={{width: "100%", height: "50px"}}/>

export default App;
