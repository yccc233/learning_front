import { notification } from 'antd';

const Notify = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

export default Notify;