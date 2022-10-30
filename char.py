# 检查文件的编码格式
import chardet
with open('/Users/yudeng/Downloads/docviewer/src/public/二进制流excel文件.txt','rb') as rawdata:
    result = chardet.detect(rawdata.read(1000))
print(result)
