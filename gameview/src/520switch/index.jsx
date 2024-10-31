'use client'
import {useRef, useState} from 'react'
import styles from '../../styles/Home.module.css'
import {Button, Progress} from "antd";
import Card from "@/src/vips1234/card";

export default function Index() {

    const containerWidth = 1050

    const [cardList, setCardList] = useState([])
    const [listInfo, setListInfo] = useState({})


    const setCardListRef = useRef()
    const setListInfoRef = useRef()

    setCardListRef.current = (ext) => {
        setCardList(cardList.concat(ext))
    }

    setListInfoRef.current = (ext) => {
        setListInfo({
            ...listInfo,
            ...ext
        })
    }


    function parseValue(uint8Arr) {
        const decoder = new TextDecoder('utf-8');
        const str = decoder.decode(uint8Arr);
        try {
            return str ? JSON.parse(str) : null
        } catch (e) {
            console.error("parseValue", str, e)
        }
    }

    async function fetchData() {
        const response = await fetch('/api/getSwitchGamesList')
        if (!response.ok) {
            console.error(response)
        } else {
            const reader = response.body.getReader();
            let streamDone = false;

            // 读取流数据的函数
            async function readStream() {
                while (!streamDone) {
                    const {done, value} = await reader.read();
                    const result = parseValue(value)

                    if (done) {
                        // 流已结束
                        streamDone = true;
                        return;
                    }
                    if (result.type === "info") {
                        setListInfoRef.current({total: Number(result.data)})
                    } else {
                        setListInfoRef.current({page: result.page})
                        setCardListRef.current(result.data)
                    }
                }
            }

            await readStream()
        }
    }

    function getPercent() {
        const {page, total} = listInfo
        if (page && total) {
            return ((page / total) * 100).toFixed()
        }
        return 0
    }


    // useEffect(() => {
    //     fetchData()
    // }, []);

    return (
        <div className={styles.container}>
            <Button style={{position: "absolute", right: 0, top: 60}}
                    onClick={async () => await fetchData()}>开始</Button>
            <main className={styles.main} style={{width: containerWidth}}>
                <div className={styles.process}>
                    <Progress
                        percent={getPercent()}
                        percentPosition={{
                            align: 'center',
                            type: 'inner',
                        }}
                        size={[containerWidth, 25]}
                    />
                </div>
                <div className={styles.gameList}>
                    {
                        cardList.map((item, index) => (
                            <Card key={`card_${index}`} info={item}/>
                        ))
                    }
                </div>
            </main>
        </div>
    )
}
