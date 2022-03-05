
import React from "react";
import cookie from "react-cookies";
import Notify from "../notify";
import Topbar from "./Topbar";

const $ = require("jquery");

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: undefined,
            account: undefined,
            name: undefined
        }
    }
    
    componentDidMount() {
        console.log(cookie.load("userid"))
        $.post("http://localhost:3005/select/getAccountById", {userid: cookie.load("userid")}).done(res => {
            console.log(res)
            res = JSON.parse(res)
            if (res.code === 0) {
                let oneDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                cookie.save("account", res.data.account, {expires: oneDay});
                cookie.save("role", res.data.role, {expires: oneDay});
                this.setState({
                    role: res.data.role,
                    account: res.data.account,
                    name: res.data.name
                })
            } else {
                Notify("error", res.message);
            }
        });
    }
    
    render() {
        if (! this.state.role) return null;
        return (
            <div>
                <Topbar account={this.state.account} name={this.state.name} role={this.state.role}/>
            </div>
        );
    }
}

export default Homepage;