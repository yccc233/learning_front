
import React, {useState} from "react";

import {Modal, Button} from "antd";

function MyModal() {

    let [isVisible, setVisible] = useState(false);


    return [
        <Modal
            footer={null}
            visible={isVisible}
            title={null}
            closable={false}
        >hello</Modal>,
        <Button type={"primary"} onClick={() => setVisible(true)}>click me</Button>];

}


export default MyModal;
