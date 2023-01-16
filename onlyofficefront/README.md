# 拉取onlyoffice的镜像

```
docker pull onlyoffice/documentserver
```

# 启动容器

```
# 官网
sudo docker run -i -t -d -p 80:80 --restart=always onlyoffice/documentserver-ee
```

```
# 我的
docker run -i -t -d -p 80:80 onlyoffice/documentserver
```

！启动容器后会下载各种配置等，需要一些时间

完成后进入[http://localhost/example/](http://localhost:1234/example/)