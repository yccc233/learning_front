import React, {useContext, useState} from "react";
import {Select} from "antd";

const {Option} = Select;

const themes = {
    light: {
        foreground: "#000000",
        background: "#ffffff"
    },
    dark: {
        foreground: "#ffffff",
        background: "#000000"
    }
};

const ThemeContext = React.createContext(themes.light);

function Usecontext() {
    const [theme, setThe] = useState("dark");

    return (
        <ThemeContext.Provider value={themes[theme]}>
            <Select style={{width: 100}} defaultValue={theme} onChange={(v) => {
                setThe(v);
            }}>
                <Option value={"dark"}>dark</Option>
                <Option value={"light"}>light</Option>
            </Select>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
        <button style={{ background: theme.background, color: theme.foreground }}>
            I am styled by theme context!
        </button>
    );
}

export default Usecontext;
