import React, { useEffect, useState } from 'react';
import Img from './imagepreview';

function Picture(props) {
    const [stream, setStream] = useState(null);

    useEffect(() => {
        if (props.fileStream) {
          setStream(`data:image/png;base64,${props.fileStream}`);
        }
    }, []);
    if (!stream) return null;
    return <Img imgsrc={stream} />;
}

export default Picture;