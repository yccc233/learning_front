import styles from '../../styles/Card.module.css';
import {Image} from "antd"

export default function Card({info}) {
    console.log(info)

    const goDetail = () => {
        window.open(info.siteUrl)
    }

    return <div className={styles.card}>
        <Image src={info.imgSrc} preview/>
        <div className={styles.nameDom} onClick={goDetail}>
            <div className={"font-bold"} style={{color: '#eee', margin: "10px"}}>
                {info.title}
            </div>
        </div>
    </div>
}