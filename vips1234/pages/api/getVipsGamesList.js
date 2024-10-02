import * as cheerio from "cheerio";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function getVipsGamesList(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Transfer-Encoding', 'chunked');  // 强制使用分块传输编码
    res.setHeader('Content-Type', 'text/event-stream'); // 使用流的事件流 (SSE) 格式
    res.flushHeaders();  // 立即发送头部信息，确保客户端尽快开始接收数据

    async function fetchVipsDataChunk(page) {
        try {
            const $ = await cheerio.fromURL(`https://vips1234.cn/page/${page}`);
            const games_list_ele = $('article')
            const games_list = []
            games_list_ele.map((ind, elem) => {
                const a_ele = $(elem).find('a')[0]
                const img_ele = a_ele.children[1]
                const title_eke = $(elem).find('.entry-title')[0]

                games_list.push({
                    imgSrc: img_ele.attribs['data-src'],
                    title: title_eke.children[0].attribs.title,
                    siteUrl: a_ele.attribs.href
                })
            })
            return games_list; // 假设返回的数据是文本或可以转换为文本的格式
        } catch (error) {
            throw new Error(`fetching data: ${error.message}`);
        }
    }

    async function getTotalPagesInVips1234() {
        try {
            const $ = await cheerio.fromURL('https://vips1234.cn/');
            const ul_page_eles = $('a.page-numbers')
            const last_ele = ul_page_eles[ul_page_eles.length - 2]
            return last_ele.children[0].data
        } catch (error) {
            throw new Error(`fetching data: ${error.message}`);
        }
    }

    // 定义一个生成器函数，它模拟持续获取数据
    async function* dataStream() {
        let page = 1, dataChunk = '';
        const totalPage = await getTotalPagesInVips1234()
        dataChunk = JSON.stringify({
            type: "info",
            data: totalPage
        });
        yield  dataChunk

        while (page <= totalPage) {
            const dataChunk = JSON.stringify({
                type: "list",
                data: await fetchVipsDataChunk(page),
                page: page
            });
            console.log(`拿取${page}/${totalPage}页面内容`)
            yield dataChunk;
            page++;
            await sleep(1000)
        }
    }

    // 使用for...of循环来处理生成器返回的数据块
    await (async () => {
        for await (const chunk of dataStream()) {
            res.write(chunk)
            res.flush()
        }
        res.end(); // 所有数据块发送完毕后关闭响应流
    })();
}
