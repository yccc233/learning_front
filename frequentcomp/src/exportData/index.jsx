import {Button} from "antd";
import ExcelJS from "exceljs";

export default function ExportData() {
    const imageToBase64 = async (url, width, height) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = 'Anonymous'; // 使用 'Anonymous' 处理跨域问题
            image.src = url;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = width || image.width;
                canvas.height = height || image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width || image.width, height || image.height);
                const base64 = canvas.toDataURL('image/png');
                resolve(base64);
            };
            image.onerror = (error) => {
                reject(error);
            };
        })
    };

    const getInfo = (name = "张三", index) => {
        const infos = [
            `我叫${name}，现就读于信息工程学院，主修物理教育。我热爱学习新知识，并且在数据分析和编程方面有一定的经验。\n我的兴趣爱好广泛，喜欢阅读、旅行和运动。我相信通过不断努力和学习，能够不断提升自己的能力，为未来的职业发展打下坚实基础。`,
            `我是${name}，来自南暄禾雅公司，主要负责焊接相机相关产品的开发和维护。我们的产品MP-C200性能优越，适用于多种焊接观察需求。\n在工作之余，我喜欢参加各类技术交流活动，结交志同道合的朋友，并从中获得启发和灵感。希望在未来能够在专业领域取得更多成就。`,
            `我叫${name}，是一名物理教育专业的学生，同时也是一名编程爱好者。\n我喜欢通过编程解决实际问题，尤其是在数据清洗和可视化方面有较多的实践经验。\n除了学术和技术方面，我也热衷于公益活动，曾多次参与社区服务项目，帮助需要帮助的人。\n我相信，善良和努力是实现个人价值的重要途径。`,
            `我是${name}，目前就读于信息工程学院，专攻物理教育。\n我对数据科学有浓厚兴趣，并在多个项目中应用相关知识进行数据处理和分析。\n在课余时间，我喜欢探索新技术，参与开源项目，并通过不断学习和实践提升自己的技能。\n我希望未来能够在数据科学领域有所作为，为社会创造更多价值。`
        ];
        return index ? infos[index % infos.length] : infos[Math.floor(Math.random() * infos.length)];
    };

    const exportExcel = async () => {
        // 定义表头
        const columns = [
            {
                header: '头像',
                key: 'img',
                width: 20
            },
            {
                header: '姓名',
                key: 'name',
                width: 20
            },
            {
                header: '个人介绍',
                key: 'info',
                width: 50
            }
        ];

        // 将要导出的数据
        const exportDataList = ["张三", "李四", "李华", "王明"].map(n => ({
            name: n,
            img: 'https://picsum.photos/300/300?random=1',
            info: getInfo(n)
        }));

        // 创建工作簿
        const workbook = new ExcelJS.Workbook();
        // 创建工作表
        const workSheet = workbook.addWorksheet('表1');
        // 工作表添加表头
        workSheet.columns = columns;

        // 设置表头样式
        workSheet.getRow(1).font = {size: 14, bold: true}; // 放大一号字体并加粗
        workSheet.getRow(1).alignment = {vertical: 'middle', horizontal: 'center'};

        // 往工作表插入数据
        workSheet.addRows(exportDataList);

        // imgFieldList：图片字段名
        const imgFieldList = ['img'];

        // 往Excel插入图片
        for (let ri = 0; ri < exportDataList.length; ri++) {
            // 获取遍历的当前行
            const row = exportDataList[ri];
            // 过滤出当前行图片字段有值的
            const currentRowImgFieldList = imgFieldList.filter(e => row[e]);
            // 遍历图片字段
            for (let ai = 0; ai < currentRowImgFieldList.length; ai++) {
                const imgField = currentRowImgFieldList[ai];
                // 图片字段值，一个完整的url
                const url = row[imgField];
                // 根据url把图片转换成base64编码，这里加了await, 方法名前面必须得加async，把这个imageToBase64方法变成同步方法，imageToBase64方法后面再贴出来
                const base64 = await imageToBase64(url);
                // 把base64编码的图片插入excel工作簿里面
                const imageId = workbook.addImage({
                    base64: base64,
                    extension: 'png'
                });
                // 当前工作表（当前excel页）加入图片，图片放在 img 对应的单元格
                workSheet.addImage(imageId, {
                    tl: {col: 0.2, row: ri + 1.2},  // 图片位置调整
                    ext: {width: 200, height: 200}
                });

                // 清除单元格中的链接文本
                workSheet.getCell(`A${ri + 2}`).value = '';
            }
            // 设置除了标题之外，内容的行高，避免图片太高，这里太小，导致显示很乱
            workSheet.getRow(ri + 2).height = 200;
        }

        // 设置info列文本自动换行
        for (let i = 2; i <= exportDataList.length + 1; i++) {
            workSheet.getCell(`C${i}`).alignment = {wrapText: true};
            workSheet.getCell(`B${i}`).alignment = {vertical: 'middle', horizontal: 'center'};
        }

        // 工作簿写入excel
        workbook.xlsx.writeBuffer().then((buffer) => {
            console.log("sss", buffer);
            // 转换成Blob格式
            const blob = new Blob([buffer], {type: 'application/octet-stream'})
            // 导出excel，这里获得了blob，有很多种导出方法，可以用FileSaver.js（百度一下就有了），我这里就简单点了，用HTML的A标签导出
            const link = document.createElement("a");
            // 将a标签设置为不可见
            link.style.display = "none";
            // 通过URL.createObjectURL方法创建一个下载链接
            const url = window.URL.createObjectURL(blob);
            // 将链接设置为a标签的href属性
            link.href = url;
            // 设置下载文件的名称
            link.setAttribute("download", "数据文件.xlsx");
            // 将a标签添加到页面的body中
            document.body.appendChild(link);
            // 触发点击事件，开始下载文件
            link.click();
            // 释放Blob对象所占用的内存
            window.URL.revokeObjectURL(url);
            // 将a标签从页面中移除
            document.body.removeChild(link);
        })
    };
    return <div>
        <Button type={"primary"} className={"ml-10 mt-10"} onClick={exportExcel}>导出Excel数据</Button>
    </div>;
}